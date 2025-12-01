async function listarFotos() {
    const usuario = window.USUARIO_GITHUB;
    const repo = window.REPOSITORIO;
    const pasta = window.PASTA;

    const url = `https://api.github.com/repos/${usuario}/${repo}/contents/${pasta}`;

    const resposta = await fetch(url);
    const arquivos = await resposta.json();

    // Filtrar apenas imagens (jpg, png, jpeg)
    const fotos = arquivos.filter(arq =>
        arq.name.match(/\.(jpg|jpeg|png|gif)$/i)
    );

    return fotos.map(f => f.download_url);
}

async function carregarSlideshow() {
    const slideshow = document.getElementById("slideshow");
    const fotos = await listarFotos();

    if (fotos.length === 0) {
        slideshow.innerHTML = "<p style='color:white'>Nenhuma foto encontrada.</p>";
        return;
    }

    fotos.forEach((url, index) => {
        const img = document.createElement("img");
        img.src = url;
        img.classList.add("slide");
        if (index === 0) img.style.opacity = 1;
        slideshow.appendChild(img);
    });

    iniciarSlideshow();
}

function iniciarSlideshow() {
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    setInterval(() => {
        slides[index].style.opacity = 0;
        index = (index + 1) % slides.length;
        slides[index].style.opacity = 1;
    }, 4000);
}

carregarSlideshow();
