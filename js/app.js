fetch("/data")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("news");
    container.innerHTML = "";

    data.forEach(item => {
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${item.title}</h2>
        <p>Sumber: ${item.source}</p>
      `;
      container.appendChild(article);
    });
  })
  .catch(() => {
    document.getElementById("news").innerHTML =
      "<p>Gagal memuat berita.</p>";
  });