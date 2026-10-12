# Kane 🎵

> **Kane** é um reprodutor de música pessoal moderno, livre e de código aberto, desenvolvido como uma alternativa superior e sem restrições comerciais ao aplicativo **Lane** (`https://sklane.com/en`).

[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)

---

## ⚡ Por que o Kane?

O aplicativo Lane oficial requer uma assinatura paga (**Lane Premium** de \$3.49/mês ou \$29.32/ano) para desbloquear funcionalidades vitais como **downloads offline** e **equalização avançada**, além de ser de código fechado.

O **Kane** foi construído com os seguintes princípios:
- **100% Gratuito & Livre**: Sem planos premium, sem paywalls, sem anúncios e sem limites de recursos.
- **Motor Web Audio API de Alta Fidelidade**: Controle sonoro profissional com equalizador gráfico paramétrico de 5 bandas (-12dB a +12dB).
- **Slowed & Speed Up Nativo**: Ajuste de velocidade de 0.5x até 2.0x em tempo real, com opção de preservação de tom (Pitch) ou efeito *Nightcore* / *Slowed + Reverb*.
- **Letras Sincronizadas (*Synced Lyrics*)**: Rolagem dinâmica com destaque da estrofe atual e salto no tempo da música ao clicar na letra.
- **Offline-First & Local-First**: Suporte completo a importação de faixas locais (MP3, WAV, FLAC, OGG), importação de playlists (M3U, JSON) e persistência via `localStorage` e `IndexedDB`.
- **Zero Rastreamento / Privacidade Total**: Nenhuma telemetria invasiva ou dependência de servidores proprietários da Lane.

---

## 📸 Funcionalidades

| Recurso | Descrição |
|---|---|
| **Core Player** | Reprodução contínua, seek suave, controle de volume, próximo, anterior, shuffle e modos de repetição. |
| **Mini Player & Full Screen Player** | Barra flutuante inferior persistente e tela cheia imersiva com arte de capa e controles táteis. |
| **Equalizador Gráfico** | 5 bandas de frequência (60Hz, 250Hz, 1kHz, 4kHz, 12kHz) com predefinições prontas (*Bass Boost*, *Rock*, *Vocal*, etc.). |
| **Ajuste de Velocidade** | Altere a velocidade da música em tempo real sem distorção indesejada. |
| **Gerenciador de Fila** | Adicione faixas, reordene e limpe a lista de reprodução com facilidade. |
| **Biblioteca Pessoal** | Crie e personalize playlists, marque músicas curtidas e consulte o histórico recente. |
| **Importador Universal** | Arraste arquivos de áudio do seu computador ou importe listas M3U e arquivos JSON. |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Motor de Áudio**: Web Audio API (W3C Standard AudioContext, BiquadFilterNode, GainNode)
- **Ícones**: Lucide React
- **Build & Testes**: Vite, Vitest

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (v18 ou superior) e **npm**

### Instalação e Execução

1. Clone ou acerte o repositório:
```bash
git clone https://github.com/K3st777/Kane.git
cd Kane
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

### Executar os Testes Automatizados
```bash
npm run test
```

### Compilar para Produção
```bash
npm run build
```
Os arquivos otimizados estarão disponíveis na pasta `dist/` prontos para deploy estático em qualquer servidor (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

---

## 📖 Documentação Técnica de Engenharia

Para mais detalhes sobre a engenharia reversa do Lane e decisões arquiteturais:
- [Investigação e Evidências do APK (`docs/RESEARCH.md`)](docs/RESEARCH.md)
- [Inventário de Funcionalidades (`docs/FEATURES.md`)](docs/FEATURES.md)
- [Arquitetura de Software do Kane (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md)
- [Roteiro de Desenvolvimento (`docs/ROADMAP.md`)](docs/ROADMAP.md)
- [Matriz de Compatibilidade Lane vs. Kane (`docs/COMPATIBILITY.md`)](docs/COMPATIBILITY.md)

---

## 🤝 Como Contribuir

1. Crie um Fork do projeto.
2. Crie uma branch para sua funcionalidade: `git checkout -b feature/minha-feature`.
3. Faça o commit das suas alterações: `git commit -m 'feat: adicionar novo equalizador 10 bandas'`.
4. Envie para a sua branch: `git push origin feature/minha-feature`.
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto é distribuído sob a licença [MIT](LICENSE).