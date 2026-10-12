# Kane 🎵 — Lançador YouTube Music & Reprodutor de Alta Fidelidade

> **Kane** é um aplicativo de música moderno, elegante e de código aberto, projetado como um **lançador completo do YouTube Music** com motor sonoro de estúdio, equalizador paramétrico de 5 bandas, efeitos *Slowed & Speed Up*, letras sincronizadas e interface translúcida AMOLED com efeitos de vidro fosco (*frosted glass blur*).

---

<p align="center">
  <a href="https://github.com/K3st777/Kane/releases"><img src="https://img.shields.io/badge/Release-v1.0.0-brightgreen.svg?style=for-the-badge&logo=android" alt="Release v1.0.0" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="Licença MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://capacitorjs.com/"><img src="https://img.shields.io/badge/Capacitor-Android-119EFF.svg?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor Android" /></a>
</p>

---

## 📑 Sumário

- [Visão Geral](#-visão-geral)
- [Recursos Principais](#-recursos-principais)
- [Como Baixar e Instalar o APK (Android)](#-como-baixar-e-instalar-o-apk-android)
- [Personalização e Temas](#-personalização-e-temas)
- [Como Rodar na Web / Desenvolvimento](#-como-rodar-na-web--desenvolvimento)
- [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🌟 Visão Geral

O **Kane** combina a vastidão do catálogo do **YouTube Music** com um player de áudio nativo de nível profissional:
- **Lançador YouTube Music Integrado:** Pesquise por qualquer faixa, artista ou álbum, ou cole links do YouTube para reprodução instantânea com metadados em alta resolução.
- **Interface Mobile Nativa AMOLED:** Desenvolvida com estética de vidro fosco (*frosted glass*), luz ambiente dinâmica (*ambient glow*) e dock inferior flutuante.
- **Motor de Áudio Web Audio API:** Equalizador gráfico paramétrico de 5 bandas (-12dB a +12dB) e filtros em tempo real.
- **Efeitos de Velocidade & Pitch:** Ajuste de velocidade contínuo de 0.5x até 2.0x (*Slowed + Reverb*, *Speed Up*, *Nightcore*) com preservação opcional de tom.
- **Letras Sincronizadas (*Synced Lyrics*):** Rolagem dinâmica linha a linha com salto instantâneo no áudio ao tocar na estrofe.
- **100% Livre e Gratuito:** Sem assinaturas, sem paywalls, sem propagandas e sem rastreamento de dados.

---

## 🎧 Recursos Principais

### 🚀 Lançador do YouTube Music
- Integração com YouTube Iframe Engine para streaming de milhões de faixas.
- Pesquisa com sugestões em tempo real e detecção automática de links ou Video IDs.
- Botão direto para abrir a faixa no aplicativo oficial do YouTube Music.

### 🎛️ Equalizador Gráfico Paramétrico de 5 Bandas
- Bandas ajustáveis: **60Hz (Sub-Graves)**, **250Hz (Graves)**, **1kHz (Médios)**, **4kHz (Presença)** e **12kHz (Agudos / Brilho)**.
- Predefinições prontas: *Flat*, *Bass Boost*, *Vocal*, *Eletrônica*, *Rock* e *Acústico*.

### 🎨 Personalização de Estilo & Vidro Fosco
- Paleta de cores de destaque: **Esmeralda**, **Violeta Neon**, **Ciano Elétrico**, **Pôr do Sol Âmbar**, **Rosa Magenta** e **Minimalista Puro**.
- Controle de intensidade do efeito de vidro fosco (*Blur*): Alto, Médio, Suave e Desativado.
- Luz ambiente (*Ambient Glow*) dinâmica reagindo à arte da capa do álbum.
- Visualizador sonoro animado durante a reprodução.

### 📱 Experiência de Aplicativo Nativo
- Layout otimizado para celulares com margens seguras (*Safe Area Insets*).
- Mini Player flutuante com barra de progresso em tempo real e visualizador sonoro.
- Player em tela cheia com capa expansiva, controle de velocidade e fila de reprodução.

---

## 📱 Como Baixar e Instalar o APK (Android)

Você pode instalar o Kane diretamente em qualquer dispositivo Android (versão 7.0 ou superior):

### Passo 1: Baixar o APK
Acesse a aba de [**Releases do Kane no GitHub**](https://github.com/K3st777/Kane/releases) e faça o download do arquivo `kane-v1.0.0.apk`.

> **Arquivo local:** O APK compilado também fica disponível na pasta `release/kane-v1.0.0.apk` deste repositório.

### Passo 2: Permitir Fontes Desconhecidas
No seu dispositivo Android, habilite a permissão de **"Instalar aplicativos de fontes desconhecidas"** para o seu navegador ou gerenciador de arquivos.

### Passo 3: Instalar e Aproveitar
Abra o arquivo baixado, toque em **Instalar** e aproveite suas músicas favoritas!

---

## 💻 Como Rodar na Web / Desenvolvimento

### Pré-requisitos
- **Node.js** v18+ e **npm**.

### Instalação e Execução

```bash
git clone https://github.com/K3st777/Kane.git
cd Kane
npm install
npm run dev
```
Acesse no navegador: `http://localhost:5173`.

### Executar Testes Automatizados
```bash
npm run test
```

### Compilar para Produção (Web)
```bash
npm run build
```

---

## 🤖 Compilação do APK Android com Capacitor

```bash
npm run build
npx cap sync android
cd android
.\gradlew.bat assembleDebug
```
O arquivo APK gerado estará em:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📄 Licença

Este projeto é disponibilizado sob a licença de código aberto [MIT](LICENSE).