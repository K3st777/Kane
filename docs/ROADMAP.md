# Roteiro de Desenvolvimento — Kane Roadmap

Este documento define as etapas de engenharia, entregáveis e marcos de desenvolvimento do **Kane**, organizados por fases incrementais e auditáveis.

---

## Marcos do Projeto (Milestones)

### Marco 1: Investigação e Arquitetura (Concluído)
- [x] Extração e inspeção do APK oficial do Lane (`lane.apk`).
- [x] Levantamento de classes, rotas, modelos de dados e serviços do bytecode.
- [x] Análise do site oficial `https://sklane.com/en`.
- [x] Elaboração da documentação técnica (`RESEARCH.md`, `FEATURES.md`, `ARCHITECTURE.md`).

### Marco 2: Fundação do Projeto & Motor de Áudio (Fase Atual)
- [x] Criação do repositório modular TypeScript / React / Vite / Tailwind CSS.
- [x] Implementação do motor sonoro Web Audio API com controle de volume, `playbackRate` e `BiquadFilterNode` para equalização.
- [x] Modelagem das entidades de dados (`Track`, `Playlist`, `Lyrics`, `EqualizerPreset`).
- [x] Criação do serviço de persistência local (`StorageService`).

### Marco 3: Interface do Reprodutor e Gerenciamento de Fila
- [x] Componente `MiniPlayer` fixo com progresso em tempo real e controles rápidos.
- [x] Componente `FullScreenPlayer` com capa animada, controle de velocidade (*Slowed & Speed Up*), scrub de tempo e equalizador modal.
- [x] Visualizador de letras sincronizadas (*Synced Lyrics*) com rolagem automática.
- [x] Gerenciador de fila interativo com suporte a Shuffle e Repeat.

### Marco 4: Biblioteca, Playlists e Descoberta
- [x] Visualização de Biblioteca com abas para Músicas Curtidas, Playlists e Histórico de Reprodução.
- [x] Criação, edição e exclusão de Playlists.
- [x] Módulo de Busca inteligente com filtragem rápida.
- [x] Importador de faixas locais (MP3, WAV, FLAC, OGG) e listas externas (formato JSON/M3U/Texto).

### Marco 5: Validação, Testes e Documentação
- [x] Testes unitários automatizados para motor de áudio, fila, algoritmos de shuffle e persistência.
- [x] Verificação de acessibilidade e responsividade para dispositivos móveis e desktop.
- [x] Documento comparativo de paridade (`COMPATIBILITY.md`).
- [x] Instruções detalhadas de compilação, execução e empacotamento no `README.md`.

---

## Próximas Etapas Futuras (Pós-v1.0)
- **Integração P2P WebRTC**: Compartilhamento descentralizado de playlists e sincronização de escuta em tempo real com amigos sem servidor central.
- **Visualizador 3D WebGL**: Visualizador espectral de áudio 3D inspirado nos badges do Google Filament do Lane original.
- **Empacotamento Desktop**: Distribuição de instaladores nativos para Windows (.msi), Linux (.AppImage) e macOS (.dmg) usando Tauri.
