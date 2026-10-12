# Kane 🎵 — Reprodutor de Música Livre & Open Source

> **Kane** é um reprodutor de música pessoal moderno, ágil e de código aberto, projetado como uma **alternativa completa, ética e superior ao aplicativo Lane** (`https://sklane.com/en`), eliminando assinaturas pagas, bloqueios artificiais e rastreamento.

---

<p align="center">
  <a href="https://github.com/K3st777/Kane/releases"><img src="https://img.shields.io/badge/Release-v1.0.0--beta-brightgreen.svg?style=for-the-badge&logo=android" alt="Release v1.0.0" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="Licença MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://capacitorjs.com/"><img src="https://img.shields.io/badge/Capacitor-Android-119EFF.svg?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor Android" /></a>
</p>

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Comparativo: Kane vs. Lane](#-comparativo-kane-vs-lane)
- [Recursos Principais](#-recursos-principais)
- [Como Baixar e Instalar o APK (Android)](#-como-baixar-e-instalar-o-apk-android)
- [Como Rodar na Web / Desenvolvimento](#-como-rodar-na-web--desenvolvimento)
- [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
- [Documentação Técnica de Engenharia](#-documentação-técnica-de-engenharia)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🌟 Visão Geral

O aplicativo oficial **Lane** promove uma experiência musical estética, porém impõe restrições comerciais severas através do seu plano **Lane Premium** ($3.49/mês ou $29.32/ano). No Lane oficial, recursos essenciais como **downloads offline ilimitados**, **equalizador sonoro profissional** e customização avançada de áudio ficam restritos a pagantes.

O **Kane** nasce para redefinir essa experiência:
- **Zero Paywalls:** Todos os recursos avançados vêm desbloqueados de fábrica.
- **Local-First & Offline:** Suas músicas, playlists e configurações residem no seu dispositivo.
- **Áudio de Estúdio:** Equalizador gráfico paramétrico de 5 bandas acionado pelo motor nativo Web Audio API.
- **Efeitos de Velocidade:** Ajuste em tempo real (*Slowed + Reverb*, *Speed Up*, *Nightcore*) com preservação opcional de tom.
- **Privacidade Absoluta:** Sem login obrigatório, sem rastreadores comerciais e sem telemetria invasiva.

---

## ⚖️ Comparativo: Kane vs. Lane

| Funcionalidade | Lane Oficial | Kane (Open Source) | Vantagem do Kane |
|---|---|---|---|
| **Custo de Uso** | Mensalidade (\$3.49/mês) ou Anual (\$29.32) | **100% Gratuito e Livre** | Sem cobranças ou assinaturas |
| **Código-Fonte** | Proprietário e fechado | **Código Aberto (Licença MIT)** | Auditável e transparente |
| **Equalizador Paramétrico** | Bloqueado na versão gratuita | **5 bandas livres (-12dB a +12dB)** | Total liberdade acústica |
| **Slowed & Speed Up** | Recursos limitados | **0.5x a 2.0x com Pitch Shift** | Preservação de tom ou Nightcore |
| **Letras Sincronizadas** | Depende de serviço fechado | **Synced Lyrics interativas (LRC)** | Salto na música ao clicar no verso |
| **Reprodução Offline** | Limitada no plano grátis | **Offline-First ilimitado** | Importação direta de áudio local |
| **Importação de Mídia** | Formatos restritos | **MP3, WAV, FLAC, OGG, M3U, JSON** | Compatibilidade universal |
| **Privacidade** | Coleta de dados analíticos | **Zero telemetria ou rastreadores** | Seus dados ficam no seu aparelho |

---

## 🎧 Recursos Principais

### 🎛️ Motor de Áudio Web Audio API de Alta Precisão
- Filtros biquad em tempo real nas faixas fundamentais: **60Hz (Sub-bass)**, **250Hz (Graves)**, **1kHz (Médios)**, **4kHz (Médios-Agudos)** e **12kHz (Agudos)**.
- Predefinições acústicas instantâneas: *Flat*, *Bass Boost*, *Rock*, *Pop*, *Jazz*, *Vocal Boost*, *Eletrônica* e *Acústico*.
- Controle de velocidade contínuo de **0.5x a 2.0x** com chave seletora de preservação de timbre vocal (*Preserve Pitch*).

### 📝 Letras Sincronizadas (*Synced Lyrics*)
- Sincronização milissegundo a milissegundo em tempo real.
- Rolagem suave com destaque visual na estrofe atual.
- Toque em qualquer linha da letra para saltar a reprodução instantaneamente para aquele trecho.

### 📂 Biblioteca & Gerenciamento Offline
- Suporte a arrastar e soltar (*Drag & Drop*) de pastas inteiras de músicas.
- Suporte nativo a arquivos locais de áudio: **MP3, WAV, FLAC, OGG, AAC, M4A**.
- Importação e exportação de listas de reprodução em formato universal **M3U** e **JSON**.
- Criação e edição de playlists personalizadas com arte de capa dinâmica.
- Sistema de favoritos (curtidas) e histórico recente de reprodução salvo localmente via `IndexedDB` e `localStorage`.

### 📱 Experiência Mobile & Desktop Fluida
- Interface responsiva com design moderno (*Dark Mode* sofisticado em tons escuros e detalhes esmeralda).
- Mini Player flutuante com barra de progresso em tempo real e controles de transporte rápidos.
- Full Screen Player imersivo com arte do álbum, controle de volume fino, repetição (*Loop One / Loop All*) e ordem aleatória (*Shuffle*).

---

## 📱 Como Baixar e Instalar o APK (Android)

Você pode instalar o Kane diretamente em qualquer dispositivo Android (versão 7.0 ou superior):

### Passo 1: Baixar o APK
Acesse a página de [**Releases do Kane no GitHub**](https://github.com/K3st777/Kane/releases) e faça o download do arquivo `kane-v1.0.0.apk`.

> **Dica:** O arquivo APK também fica disponível na pasta `release/kane-v1.0.0.apk` deste repositório para acesso direto.

### Passo 2: Permitir Instalação de Fontes Desconhecidas
1. Abra as **Configurações** do seu Android.
2. Navegue até **Segurança** (ou **Privacidade** / **Aplicativos**).
3. Habilite a opção **"Instalar aplicativos de fontes desconhecidas"** para o seu navegador ou gerenciador de arquivos.

### Passo 3: Concluir a Instalação
1. Abra o arquivo `kane-v1.0.0.apk` baixado.
2. Toque em **Instalar** e aguarde alguns segundos.
3. Abra o **Kane** e aproveite suas músicas com total liberdade!

---

## 💻 Como Rodar na Web / Desenvolvimento

### Pré-requisitos
- **Node.js** v18+ instalado.
- **npm** ou **yarn**.

### Passos de Instalação e Execução

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/K3st777/Kane.git
   cd Kane
   ```

2. **Instalar Dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:5173`.

4. **Executar a Suíte de Testes Automatizados**:
   ```bash
   npm run test
   ```

5. **Gerar a Build de Produção Web**:
   ```bash
   npm run build
   ```
   Os arquivos finais otimizados serão gerados na pasta `dist/`.

---

## 🤖 Compilação do APK Android com Capacitor

O Kane utiliza **Capacitor** para empacotar o código web em uma aplicação nativa de alta performance para Android.

### 1. Sincronizar os Assets Web com o Projeto Nativo
```bash
npm run build
npx cap sync android
```

### 2. Compilar via Linha de Comando (Gradle)
```bash
cd android
./gradlew assembleDebug
# No Windows PowerShell:
.\gradlew.bat assembleDebug
```
O arquivo APK gerado estará em:
`android/app/build/outputs/apk/debug/app-debug.apk`

### 3. Compilação Automatizada no GitHub Actions
Toda alteração enviada para o repositório aciona o workflow [`.github/workflows/build-apk.yml`](.github/workflows/build-apk.yml), que compila o APK automaticamente em contêineres Ubuntu com Java 17 e disponibiliza o artefato para download.

---

## 🏗️ Arquitetura e Tecnologias

O projeto adota uma arquitetura modular baseada em separação estrita de responsabilidades:

```
Kane/
├── android/                 # Projeto nativo Android (Capacitor)
├── docs/                    # Relatórios de engenharia reversa e arquitetura
│   ├── RESEARCH.md          # Evidências do Lane APK e endpoints públicos
│   ├── FEATURES.md          # Inventário exaustivo de funcionalidades
│   ├── ARCHITECTURE.md      # Decisões arquiteturais do Kane
│   ├── ROADMAP.md           # Fases de entrega e paridade técnica
│   └── COMPATIBILITY.md     # Matriz comparativa Lane vs Kane
├── release/                 # Pasta com o APK empacotado para distribuição
├── src/
│   ├── components/          # Componentes visuais React (Player, Modais, Views)
│   ├── engine/              # Motor de áudio nativo (AudioContext, Equalizador)
│   ├── services/            # Serviços de persistência, catálogo e importação
│   ├── types/               # Tipagens TypeScript (Track, Playlist, Equalizer)
│   └── tests/               # Testes unitários com Vitest
└── capacitor.config.ts      # Configuração de empacotamento móvel
```

- **Linguagem Principal**: TypeScript 5.x com checagem estrita de tipos.
- **Interface Gráfica**: React 18, Tailwind CSS, Lucide Icons.
- **Processamento de Áudio**: Web Audio API (`AudioContext`, `BiquadFilterNode`, `GainNode`).
- **Persistência**: `localStorage` com suporte a `IndexedDB` para blobs de áudio.
- **Ambiente Mobile**: Capacitor 6.x.

---

## 📚 Documentação Técnica de Engenharia

Para pesquisadores, desenvolvedores e auditores interessados nos detalhes da investigação reversa:
- 🔍 [Investigação e Evidências do APK (`docs/RESEARCH.md`)](docs/RESEARCH.md)
- 📋 [Inventário de Funcionalidades do Lane (`docs/FEATURES.md`)](docs/FEATURES.md)
- 🏛️ [Arquitetura de Software do Kane (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md)
- 🗺️ [Roteiro de Desenvolvimento e Milestones (`docs/ROADMAP.md`)](docs/ROADMAP.md)
- 📊 [Matriz de Compatibilidade Detalhada (`docs/COMPATIBILITY.md`)](docs/COMPATIBILITY.md)

---

## 🤝 Contribuição

Contribuições são muito bem-vindas! Se você deseja adicionar suporte a novas fontes de áudio, aprimorar a interface ou reportar bugs:

1. Faça um Fork do projeto.
2. Crie uma branch para sua modificação:
   ```bash
   git checkout -b feature/minha-melhoria
   ```
3. Commit suas alterações seguindo o padrão de commits semânticos:
   ```bash
   git commit -m "feat: adicionar visualizador de ondas sonoras"
   ```
4. Envie sua branch:
   ```bash
   git push origin feature/minha-melhoria
   ```
5. Abra um Pull Request detalhado.

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [MIT](LICENSE). Você é livre para usar, estudar, modificar e redistribuir este software sem restrições proprietárias.