# Inventário de Funcionalidades do Lane e da Alternativa Kane

Este documento cataloga de forma exaustiva todas as funcionalidades identificadas no aplicativo Lane (`com.skiy.lane`) a partir das evidências do APK e do site oficial, classificadas por prioridade técnica para o desenvolvimento da alternativa open source **Kane**.

---

## 1. Categorização de Funcionalidades

As funcionalidades estão divididas em três níveis de maturidade e prioridade:

- **Essenciais (Tier 1)**: Fundamentais para a primeira versão funcional e utilizável do reprodutor.
- **Avançadas (Tier 2)**: Relevantes para paridade com os diferenciais competitivos do Lane (efeitos sonoros, letras, importadores).
- **Experimentais (Tier 3)**: Recursos que dependem de infraestrutura proprietária ou serviços de terceiros com APIs restritas.

---

## 2. Funcionalidades Essenciais (Tier 1)

### 2.1 Motor de Reprodução de Áudio (Core Player)
- **Descrição**: Reprodução de faixas com suporte a pause, play, seek (avanço e retrocesso), faixa anterior e próxima faixa.
- **Evidência no Lane**: Classes `MusicPlayerController`, `MusicService`, `androidx.media3.exoplayer.ExoPlayer`.
- **Implementação Kane**: Player em HTML5 / Web Audio API com gerenciamento de eventos (`timeupdate`, `ended`, `canplay`), bufferização suave e suporte a múltiplos formatos de áudio (MP3, AAC, OGG, WAV, FLAC).

### 2.2 Controle de Velocidade e Efeitos em Tempo Real (Slowed & Speed Up)
- **Descrição**: Ajuste de velocidade de reprodução de 0.5x até 2.0x sem alteração destrutiva do arquivo de áudio.
- **Evidência no Lane**: Anúncio principal do site ("*Slowed & Speed Up any song*"), classe `TrackEffect` e parâmetros do ExoPlayer.
- **Implementação Kane**: Controle em tempo real via propriedade `playbackRate` e `preservesPitch` da API de áudio, com presets rápidos (0.75x Slowed, 1.0x Normal, 1.25x Speed Up, 1.5x Nightcore).

### 2.3 Gerenciamento de Fila de Reprodução (Queue Management)
- **Descrição**: Visualização e manipulação da lista de faixas na fila, adição à fila ("Tocar a seguir" / "Adicionar ao final"), reordenação e limpeza.
- **Evidência no Lane**: Pacote `presentation/compose/queue`, `ReorderPlaylistRequest`.
- **Implementação Kane**: Gerenciador de fila imutável com suporte a reordenação arrastável (drag & drop), modos de repetição (desligado, repetir todas, repetir uma) e reprodução aleatória (*Shuffle* com algoritmo Fisher-Yates).

### 2.4 Interface do Reprodutor: Mini Player e Full Screen Player
- **Descrição**: Barra de reprodução persistente na parte inferior com controles rápidos, expansível para tela cheia com capa do álbum, controle de tempo, barra de progresso interativa e controles de volume.
- **Evidência no Lane**: Classes `MiniPlayerKt` e `FullScreenPlayerKt` em `presentation/compose/player`.
- **Implementação Kane**: Componentes modulares `MiniPlayer` e `FullScreenPlayer` com transição fluida, controle de scrubbing com precisão de milissegundos e suporte a teclas de atalho (Barra de espaço, setas).

### 2.5 Gerenciamento de Biblioteca e Playlists Locais
- **Descrição**: Criação, renomeação, exclusão de playlists personalizadas, adição e remoção de faixas e marcação de faixas favoritas (Curtidas).
- **Evidência no Lane**: Entidades `TrackEntity`, `LanePlaylistItem`, telas `presentation/compose/playlist`.
- **Implementação Kane**: Armazenamento reativo via `localStorage` e `IndexedDB`, garantindo persistência sem necessidade de login ou servidor remoto.

### 2.6 Busca e Descoberta Unificada
- **Descrição**: Busca por título, artista e álbum, com filtragem instantânea e sugestões dinâmicas.
- **Evidência no Lane**: `SearchViewModel`, `LaneCombinedSearchResponse`, `SmartHintsResponse`.
- **Implementação Kane**: Módulo de busca com debounce inteligente, histórico de buscas recentes e pesquisa unificada em catálogo aberto e faixas locais.

---

## 3. Funcionalidades Avançadas (Tier 2)

### 3.1 Equalizador Gráfico Multibanda
- **Descrição**: Ajuste de frequências sonoras (Graves, Médios, Agudos) com presets pré-configurados (Rock, Pop, Bass Boost, Flat, Vocal, Eletrônica).
- **Evidência no Lane**: Arquivos `assets/equalizer.json`, `assets/equalizer_light.json`, classe `EqualizerController`.
- **Implementação Kane**: Nó `BiquadFilterNode` conectado ao fluxo de áudio da Web Audio API com 5 a 10 bandas de frequência e ganho em decibéis (-12dB a +12dB).

### 3.2 Letras de Música Sincronizadas (Synced Lyrics)
- **Descrição**: Exibição da letra da música rolando em sincronia com o tempo da reprodução atual (formato LRC ou timestamps).
- **Evidência no Lane**: DTOs `TrackLyrics`, `TrackLyricsLine` (com `startTimeMs` e `content`), endpoint `GET /track/{trackId}/lyrics`.
- **Implementação Kane**: Parser de formato LRC e renderizador de letras sincronizadas com rolagem automática para a linha ativa e clique para saltar o tempo da música.

### 3.3 Download e Reprodução Offline Sem Restrições
- **Descrição**: Capacidade de baixar faixas em cache ou salvar áudio no dispositivo para ouvir sem conexão com a internet.
- **Evidência no Lane**: `DownloadedTrackEntity`, `DownloadManager`, `DownloadWorker`. No Lane oficial, este recurso é pago no *Lane Premium*.
- **Implementação Kane**: **100% Gratuito**. Armazenamento de blobs de áudio no IndexedDB do navegador e botão de download direto de arquivos em MP3/FLAC.

### 3.4 Importador de Playlists Multi-Plataforma
- **Descrição**: Importação de músicas e playlists de plataformas externas como Spotify, SoundCloud, YouTube Music e arquivos locais (M3U, JSON).
- **Evidência no Lane**: Telas `ImportOptions`, `ImportPreview`, `SpotifyWebViewScreen`, `YandexWebViewScreen`, `TelegramImport`.
- **Implementação Kane**: Importador universal com suporte a URLs públicas do Spotify/SoundCloud, arquivos M3U, listas de texto e JSON estruturado.

### 3.5 Personalização Visual e Temas
- **Descrição**: Customização da paleta de cores da interface, modo escuro AMOLED, modo claro e acentos de cor inspirados na estética neon/cyberpunk do Lane (`#FF8284`).
- **Evidência no Lane**: Site oficial ("*Interface customization*"), classes de tema Compose.
- **Implementação Kane**: Seletor de temas integrado com suporte a Dark Mode, Light Mode, Obsidian AMOLED e temas customizáveis.

---

## 4. Funcionalidades Experimentais (Tier 3)

### 4.1 Presença de Amigos e Atividade em Tempo Real
- **Descrição**: Visualizar o que amigos estão ouvindo no momento e status online.
- **Evidência no Lane**: DTOs `FriendPresenceDto`, `FriendActivityEvent`, `UpdatePresenceRequest`.
- **Viabilidade Open Source**: Requer servidor WebSocket centralizado ou rede P2P (WebRTC). Na versão inicial do Kane, mantido como especificação para futuras versões P2P.

### 4.2 Sistema Comunitário de Comentários em Músicas
- **Descrição**: Comentários com carimbo de tempo na faixa e reações.
- **Evidência no Lane**: `CommentsApi`, `LaneTrackComment`, `CreateTrackComment`.
- **Viabilidade Open Source**: Pode ser integrado com redes descentralizadas como Nostr ou Mastodon/ActivityPub sem necessidade de um backend central mantido pela equipe.

### 4.3 Badges 3D de Artistas e Usuários
- **Descrição**: Modelos 3D interativos renderizados via Google Filament.
- **Evidência no Lane**: `UserBadge3D`, `libfilament-jni.so`, arquivos `.filamat` em `assets/materials/`.
- **Viabilidade Open Source**: Pode ser renderizado no navegador via Three.js / WebGL.
