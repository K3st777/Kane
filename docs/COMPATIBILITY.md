# Matriz de Compatibilidade e Comparação: Lane vs. Kane

Esta tabela compara objetivamente o aplicativo proprietário **Lane** e a implementação livre **Kane**, com base em evidências verificadas.

---

## Tabela de Comparação

| Funcionalidade | Lane (Proprietário) | Kane (Open Source) | Evidência no Lane | Status no Kane |
|---|---|---|---|---|
| **Reprodução de Áudio Contínua** | Sim (Media3 / ExoPlayer) | Sim (Web Audio API / HTML5 Audio) | `MusicPlayerController`, `MusicService` | **Implementado e testado** |
| **Ajuste de Velocidade (*Slowed & Speed Up*)** | Sim (Aceleração e desaceleração) | Sim (0.5x até 2.0x com presets de 1 clique) | Site Oficial, `TrackEffect` | **Implementado e testado** |
| **Equalizador Multibanda** | Sim (Presets e controle de bandas) | Sim (5 bandas paramétricas e presets) | `EqualizerController`, `assets/equalizer.json` | **Implementado e testado** |
| **Letras Sincronizadas (*Synced Lyrics*)** | Sim (LRC / Timestamps de linha) | Sim (Visualização com auto-scroll e seek interativo) | `TrackLyrics`, `TrackLyricsLine` | **Implementado e testado** |
| **Mini Player e Full Screen Player** | Sim (Jetpack Compose) | Sim (Design responsivo mobile/desktop) | `MiniPlayerKt`, `FullScreenPlayerKt` | **Implementado e testado** |
| **Gerenciador de Fila e Shuffle** | Sim (Fila reordenável) | Sim (Reordenação, repetição e shuffle Fisher-Yates) | `presentation/compose/queue` | **Implementado e testado** |
| **Biblioteca e Playlists Customizadas** | Sim (Room DB e sincronização) | Sim (Persistência reativa local) | `LaneDatabase`, `PlaylistRepository` | **Implementado e testado** |
| **Download / Cache Offline** | Parcial (Bloqueado atrás do plano pago de \$3.49/mês) | **Totalmente Gratuito** (Download de arquivos e cache) | `DownloadedTrackEntity`, termos de preço no site | **Implementado e testado** |
| **Importação de Mídia Local** | Suporta arquivos do dispositivo | Suporta importação drag & drop e arquivos de áudio | `READ_EXTERNAL_STORAGE`, `TrackLocalKitKt` | **Implementado e testado** |
| **Importação de Playlists Externas** | Spotify, Yandex, Telegram | Suporta JSON, M3U e listas estruturadas | `SpotifyWebViewScreen`, `TelegramImportCode` | **Implementado e testado** |
| **Restrições Comerciais / Paywall** | Sim (\$3.49/mês ou \$29.32/ano) | **Nenhum paywall (100% Livre)** | Seção de preços em `https://sklane.com/en` | **Superado (Sem Paywall)** |
| **Licença do Código** | Proprietário / Código Fechado | Código Aberto (Licença MIT) | Análise reversa de artefato binário | **Open Source** |
| **Presença de Amigos em Tempo Real** | Sim (Via servidores da empresa) | Planejado via P2P (WebRTC) | `FriendPresenceDto`, `FriendActivityEvent` | *Não implementado (Fase 2)* |
| **Badges 3D de Artistas** | Sim (Google Filament JNI) | Estilização gráfica e vetorial | `UserBadge3D`, `libfilament-jni.so` | *Parcialmente implementado* |

---

## Status dos Recursos:
- **Implementado e testado**: Funcionalidades essenciais e avançadas concluídas e verificadas com testes automatizados e interface ativa.
- **Superado**: Melhorias conceituais em que o Kane elimina restrições impostas pelo modelo proprietário do Lane (como gratuidade no download offline e sem anúncios).
- **Planejado**: Recursos sociais dependentes de servidores centralizados que serão adaptados para tecnologias abertas descentralizadas.
