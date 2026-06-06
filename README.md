# Roseiral Romântico

Site romântico e interativo feito em HTML, CSS e JavaScript puro. Ele abre direto pelo `index.html`, sem instalar dependências, e foi pensado para ser leve o suficiente para compactar e enviar pelo WhatsApp.

## Como abrir

1. Abra a pasta `roseiral-romantico`.
2. Dê dois cliques em `index.html`.
3. Clique em `Clique para abrir` para iniciar o roseiral, a mensagem e a música.

## Música

Coloque a música em:

```text
assets/audio/musica.mp3
```

O arquivo `musica.mp3` incluído é apenas um placeholder vazio para manter a estrutura pronta. Substitua por uma música real com o mesmo nome.

O navegador só tenta tocar o áudio depois do clique. O arquivo fica em loop e o JavaScript reinicia a reprodução quando chega em 60 segundos. Para mudar esse tempo, edite no arquivo `js/script.js`:

```js
musicLoopAfterSeconds: 60
```

Se o navegador bloquear o áudio, aparece o botão `Tocar música`.

## Como editar a mensagem

Abra `js/script.js` e edite o texto dentro de:

```js
message: `...`
```

Também é possível ajustar:

```js
roseCount: 34,
petalCount: 58,
starCount: 70
```

Para celulares mais antigos, reduza `petalCount` e `roseCount`.

## Como ajustar as rosas

As rosas são feitas em CSS com pétalas em camadas dentro de `.rose-bloom`. Para deixá-las mais abertas, mexa nas classes `.petal-a` até `.petal-h` em `css/style.css`. Para variar as cores, ajuste `.rose-tone-2` e `.rose-tone-3`.

## Como compactar para WhatsApp

1. Confirme que a pasta contém `index.html`, `css`, `js` e `assets`.
2. Coloque sua música como `assets/audio/musica.mp3`.
3. Clique com o botão direito na pasta `roseiral-romantico`.
4. Escolha `Enviar para > Pasta compactada` no Windows.
5. Envie o arquivo `.zip` pelo WhatsApp.

Quem receber deve extrair o ZIP e abrir o `index.html`.

## Como publicar por link

### GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todo o conteúdo da pasta `roseiral-romantico`.
3. No repositório, acesse `Settings > Pages`.
4. Em `Branch`, escolha a branch principal e salve.
5. Envie o link gerado pelo GitHub Pages no WhatsApp.

### Netlify

1. Acesse o Netlify.
2. Arraste a pasta `roseiral-romantico` para a área de deploy.
3. Aguarde a publicação.
4. Copie o link final e envie pelo WhatsApp.

### Vercel

1. Crie um novo projeto na Vercel.
2. Importe o repositório ou envie os arquivos.
3. Como é um site estático, não precisa configurar build.
4. Publique e envie o link final.

## Estrutura

```text
roseiral-romantico/
  assets/
    audio/
      musica.mp3
    images/
      petal.svg
  css/
    style.css
  js/
    script.js
  index.html
  README.md
```

## Observação sobre 3D

O projeto usa uma simulação visual de profundidade com CSS 3D, camadas, escala, `translateZ`, névoa, partículas e pétalas animadas. Isso evita modelos 3D pesados, mantém o pacote simples e permite abrir o site offline.
