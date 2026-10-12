# Relatório de Investigação Técnica — Lane App (`com.skiy.lane`)

> **Projeto**: Kane (Alternativa Open Source ao Lane)  
> **Data da Investigação**: 11 a 12 de Outubro de 2026  
> **Responsável**: Antigravity Engineering  
> **Alvo Analisado**: `lane.apk` (SHA-256: `9a97fde5675e999838bbb385a7196f5468a3924b86d7e9832728cb50860adfac`) e Portal Oficial `https://sklane.com/en`

---

## 1. Sumário Executivo

O aplicativo **Lane** (desenvolvido por Skiy / Sk-Lane, pacote Android `com.skiy.lane`) é um reprodutor de música pessoal e agregador de mídia que oferece reprodução em streaming e offline, busca unificada, importação de playlists externas (Spotify, SoundCloud, Yandex Music, Telegram), alteração de velocidade de reprodução em tempo real (*Slowed & Speed Up*), equalização, letras sincronizadas, comunidade com comentários em faixas, perfis personalizados e sistema de monetização por assinatura (*Lane Premium* por \$3.49/mês ou \$29.32/ano).

Esta investigação foi realizada com base em:
1. **Evidências do artefato APK compilado** (`lane.apk`), com inspeção de manifesto, tabelas de recursos, classes DEX (`classes.dex`, `classes2.dex`, `classes3.dex`), bibliotecas nativas C/C++ (`.so`) e assets.
2. **Evidências públicas do site oficial** (`https://sklane.com/en`, `https://lane.app`), incluindo metadados, scripts Next.js, termos de serviço e anúncios de recursos.
3. **Mapeamento de endpoints e DTOs** via serializadores Kotlinx e definições de Retrofit / OkHttp recuperados diretamente do bytecode.

---

## 2. Identidade e Metadados do Artefato

| Propriedade | Valor Observado | Evidência / Fonte |
|---|---|---|
| **Nome do Pacote** | `com.skiy.lane` | `AndroidManifest.xml` (offset 165 na tabela de strings) |
| **Classe de Aplicação** | `com.skiy.lane.LaneApp` (Dagger/Hilt) | `AndroidManifest.xml` |
| **SHA-256 do APK** | `9a97fde5675e999838bbb385a7196f5468a3924b86d7e9832728cb50860adfac` | Hash criptográfico verificado via REA safe artifact graph |
| **Tamanho do Arquivo** | ~74 MiB (77.297.228 bytes) | Sistema de arquivos / NanaZip |
| **Total de Arquivos** | 1.694 entradas de arquivos | `inspect_artifact` / NanaZip inventory |
| **Arquivos DEX** | 3 (`classes.dex`, `classes2.dex`, `classes3.dex`) | Extração APK |
| **Total de Classes DEX** | 49.004 classes (2.546 sob `com.skiy.lane`) | Análise estrutural de cabeçalhos DEX |
| **Backend / Domínios** | `https://laneapi.com`, `https://ru.laneapi.com`, `https://cdn.laneapi.com`, `https://music.sk-lane.com` | Tabela de strings em `classes.dex` |
| **Site Oficial** | `https://sklane.com/en`, `https://lane.app` | Conteúdo estático e Next.js bundle |

---

## 3. Arquitetura de Software do Lane (Observada no Bytecode)

A descompilação e análise estrutural dos arquivos DEX revelou uma arquitetura moderna para Android baseada em:

### 3.1 Camadas do Sistema
1. **Presentation Layer (Jetpack Compose)**:
   - Interface declarativa moderna utilizando Jetpack Compose (`presentation/compose/*`).
   - Gerenciamento de estado com `ViewModel` e `UiState` imutáveis (`PlayerViewModel`, `SearchViewModel`, `PlaylistDetailViewModel`, `ArtistProfileViewModel`, etc.).
   - Navegação baseada em rotas serializadas via `kotlinx.serialization` (`presentation/navigation/*`).

2. **Domain Layer (Clean Architecture)**:
   - Modelos de domínio bem segregados (`domain/model/*`), totalizando mais de 320 classes e data transfer objects (DTOs).
   - Casos de uso e contratos de repositório (`domain/repository/*`).

3. **Data Layer**:
   - **Remoto**: Retrofit + OkHttp com clientes REST (`CommentsApi`, `OpenApi`, `PlatformsApi`, `TracksApi`, `UserApi`).
   - **Local**: Room Database (`data/local/db/LaneDatabase`), com entidades `TrackEntity`, `DownloadedTrackEntity` e `TrimData`.
   - **Cache / Storage**: `UserCacheDataStore` para configurações locais e `TokenManager` para tokens JWT.

4. **Playback & Audio Engine**:
   - `androidx.media3.session.MediaSessionService` via `MusicService`.
   - Google ExoPlayer (`androidx.media3.exoplayer.ExoPlayer`) com gerenciamento de codecs, HLS e progressive download.
   - `ResolvingMediaSource`: resolução de streams em tempo real via provedores externos ou CDN própria.
   - `TrackEffect`: controle de velocidade (`playbackSpeed`), tempo e equalizador gráfico de frequências (`EqualizerController`).
   - DotLottie (`libuniffi_dotlottie_player.so` via Rust FFI / UniFFI) para animações de ondas e capas dinâmicas.
   - Google Filament (`libfilament-jni.so`, `libfilament-utils-jni.so`) para renderização 3D de badges de usuários.

---

## 4. Endpoints e APIs Descobertas

Por meio da extração da tabela de strings dos DEX (`classes.dex`, `classes2.dex`, `classes3.dex`), mapeamos os endpoints REST utilizados pelo Lane:

### 4.1 Módulo de Faixas (`TracksApi`)
- `POST /track/stream` — Obtém a URL resolvida de streaming da faixa com base na qualidade e na plataforma de origem.
- `GET /track/{trackId}/lyrics` — Recupera a letra sincronizada (`TrackLyrics`, `TrackLyricsLine` com timestamp em milissegundos).
- `POST /track/download` — Solicita URL assinada de download de áudio (recurso bloqueado para usuários Free no app original).
- `GET /track/{trackId}/comments` — Lista comentários públicos associados à faixa.
- `POST /track/effect` — Registra ou processa efeitos sonoros aplicados.
- `POST /track/stats` — Telemetria de reproduções.
- `POST /track/log` — Registro de eventos de áudio.

### 4.2 Módulo de Playlists e Biblioteca (`OpenApi` / `PlaylistRepository`)
- Criação, edição e reordenação de playlists (`CreatePlaylist`, `EditPlaylist`, `ReorderPlaylistRequest`).
- Controle de visibilidade (`SetPlaylistVisibilityRequest`: pública, privada, colaborativa).
- Playlists colaborativas com convite de usuários (`CollaboratorsList`, `InviteUsersRequest`).
- Cache de faixas de playlist (`CachedPlaylistStreamsResponse`).

### 4.3 Módulo de Plataformas e Importação (`PlatformsApi`)
- **Spotify**: Integração via WebView e OAuth (`SpotifyWebViewScreen`, `SpotifyAdditionalData`).
- **SoundCloud**: Suporte a resolução de metadados e áudio (`SoundCloudAdditionalData`).
- **Yandex Music**: Importação via autenticação web (`YandexWebViewScreen`, `music.yandex.ru/playlists/`).
- **Telegram**: Código de importação via bot oficial (`https://t.me/lane_music_bot?start=auth`, `TelegramImportCode`).

### 4.4 Módulo de Usuário e Social (`UserApi` / `CommentsApi`)
- Perfis de usuário com badges 3D e status de música atual (`SetStatusTrackRequest`).
- Presença de amigos em tempo real (`UpdatePresenceRequest`, `FriendPresenceDto`, `FriendActivityEvent`).
- Comentários e respostas em faixas (`CreateTrackComment`, `CreateReply`, `CommentSortBy`).
- Tributos e velas memoriais para artistas falecidos (`LaneArtistRIPInfo`, `PlaceCandleRequest`).

---

## 5. Modelo Comercial do Lane vs. Alternativa Open Source

O Lane proprietário implementa restrições comerciais por assinatura (**Lane Premium** - \$3.49/mês):

| Recurso | Lane Oficial (Free) | Lane Oficial (Premium) | Alternativa Open Source (Kane) |
|---|---|---|---|
| **Reprodução de Streaming** | Sim | Sim (Maior taxa de bits) | **Sim (Qualidade máxima livre)** |
| **Download Offline** | Bloqueado / Limitado | Liberado | **Liberado nativamente (sem restrição)** |
| **Velocidade & Efeitos Sonoros** | Básico | Total | **Total (Web Audio API / DSP nativo)** |
| **Letras Sincronizadas** | Suportado | Suportado | **Suportado livremente** |
| **Equalizador** | Limitado | Total | **Equalizador multibanda livre** |
| **Importação de Playlists** | Suportado | Suportado | **Suportado (Spotify, SC, YT, JSON, M3U)** |
| **Custo de Assinatura** | \$0 | \$3.49/mês ou \$29.32/ano | **\$0 (100% Gratuito & Open Source)** |
| **Código Fonte** | Proprietário / Fechado | Proprietário / Fechado | **Open Source (Licença MIT)** |

---

## 6. Grau de Confiança e Limitações da Investigação

- **Fatos Comprovados**: Existência de todas as rotas de navegação, modelos de dados, endpoints REST, bibliotecas nativas e recursos descritos no site oficial e no bytecode descompilado. Grau de confiança: **100%**.
- **Inferências Técnicas**: A resolução de áudio para streaming combina CDNs próprias com proxies de APIs públicas dos serviços integrados (SoundCloud, YouTube, Spotify metadata). Grau de confiança: **90%**.
- **Limitações**: Os servidores proprietários da Lane (`laneapi.com`) exigem tokens de autenticação privados e infraestrutura fechada. A alternativa open source não deve depender da API proprietária da Lane, mas sim de provedores abertos, fontes locais e adaptadores independentes.
