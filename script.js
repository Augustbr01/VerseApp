let versiculos = [];
let versiculosDoCapitulo = [];

fetch('biblia.json')
    .then(res => res.json())
    .then(data => {
        versiculos = data;
        popularLivros();
    });

function popularLivros() {
  const livros = [...new Set(versiculos.map(v => v.livro))];
  const livroSelect = document.getElementById('livro-select');
  livroSelect.innerHTML = `<option>Selecione o Livro</option>`;
  livros.forEach(livro => {
    const opt = document.createElement('option');
    opt.value = livro;
    opt.textContent = livro;
    livroSelect.appendChild(opt);
  });

  livroSelect.addEventListener('change', () => {
    const livro = livroSelect.value;
    const capitulos = [...new Set(versiculos.filter(v => v.livro === livro).map(v => v.capitulo))];
    const capituloSelect = document.getElementById('capitulo-select');
    capituloSelect.innerHTML = `<option>Capítulo</option>`;
    capitulos.forEach(cap => {
      const opt = document.createElement('option');
      opt.value = cap;
      opt.textContent = cap;
      capituloSelect.appendChild(opt);
    });

    capituloSelect.onchange = () => {
      const cap = capituloSelect.value;
      const vers = versiculos.filter(v => v.livro === livro && v.capitulo === cap).map(v => v.versiculo);
      const versiculoSelect = document.getElementById('versiculo-select');
      versiculoSelect.innerHTML = `<option>Versículo</option>`;
      vers.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        versiculoSelect.appendChild(opt);
      });
    };
  });
}

function buscarVersiculo() {
  const livro = document.getElementById('livro-select').value;
  const cap = document.getElementById('capitulo-select').value;
  const vers = document.getElementById('versiculo-select').value;

  const resultado = versiculos.find(v => v.livro === livro && v.capitulo === cap && v.versiculo === vers);
  document.getElementById('referencia').textContent = `${livro} ${cap}:${vers}`;
  document.getElementById('texto').textContent = resultado?.texto || 'Não encontrado';

  // Guardar todos os versículos do capítulo
  versiculosDoCapitulo = versiculos.filter(v => v.livro === livro && v.capitulo === cap);
  document.getElementById('mais-btn').style.display = 'inline-block';
  document.getElementById('mais-versiculos').innerHTML = '';

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.classList.remove('show');
  void resultadoDiv.offsetWidth;
  resultadoDiv.classList.add('show');
}

function mostrarMais() {
  const versSelecionado = document.getElementById('versiculo-select').value;
  const container = document.getElementById('mais-versiculos');
  container.innerHTML = '';
  container.classList.remove('show');

  let iniciou = false;
  versiculosDoCapitulo.forEach(v => {
    if (v.versiculo === versSelecionado) iniciou = true;
    if (iniciou) {
      const p = document.createElement('p');
      p.textContent = `${v.capitulo}:${v.versiculo} — ${v.texto}`;
      container.appendChild(p);
    }
  });

  void container.offsetWidth;
  container.classList.add('show');

  container.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function digitarTexto(frase, elementoId, velocidade = 60) {
    const el = document.getElementById(elementoId);
    el.textContent = '';
    let i = 0;

    const intervalo = setInterval(() => {
        el.textContent += frase[i];
        i++
        if (i === frase.length) clearInterval(intervalo);
    }, velocidade);
}

digitarTexto("Inspire-se. Fortaleça-se. Viva a Palavra.", "frase-impacto");