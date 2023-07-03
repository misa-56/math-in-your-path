document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const articlesContainer = document.getElementById('articles-container');
    const loadMoreContainer = document.getElementById('load-more-container');
    let offset = 15; // Initial offset value
    let allArticlesLoaded = false;

    loadMoreBtn.addEventListener('click', async () => {
        const response = await fetch(`/load-more?offset=${offset}`);
        const { articles } = await response.json();

        articles.forEach((article) => {
            const articleElement = document.createElement('div');
            articleElement.className = 'row g-0 overflow-hidden flex-md-row mb-1 h-md-250 position-relative border-bottom';
            articleElement.innerHTML = `
            <div class="col py-2 py-md-4 d-flex flex-column position-static">
                <div class="d-flex row">
                    <div class="col-8">
                        <a href="/${article.categorySlug}" class="d-inline-block mb-2 text-success text-decoration-none">${article.category}</a>
                        <h5 class="mb-0"><a href="/posts/${article.slug }/${article.id}" class="text-decoration-none text-dark">${article.title}</a></h5>
                        <div class="mb-1 text-muted d-none d-md-flex"><small><i class="fa-solid fa-pen"></i> ${article.createdAt}</small></div>
                        <div class="d-none d-md-flex">
                        <p class="card-text mb-auto text-secondary" 
                        style="overflow: hidden; 
                        display: -webkit-box; 
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;">
                        ${article.intro }
                        </p>
                        </div>
                    </div>
                    <div class="col-4 d-flex align-items-center">
                        <a href="/posts/${article.slug }/${article.id}" class="w-100"><img alt="article image" class="bd-placeholder-img rounded w-100" style="max-height: 140px;" src="${article.bg_image }"></img></a>
                    </div>
                </div>
            </div>
            `;
            articlesContainer.appendChild(articleElement);
        });

        offset += 10; // Increase the offset value

        // Check if all articles are loaded
        if (articles.length === 0) {
            allArticlesLoaded = true;
        }
    
        // Hide the loadMoreContainer if all articles are loaded
        if (allArticlesLoaded) {
        loadMoreContainer.style.display = 'none';
        }

        // Move the loadMoreContainer to the bottom
        articlesContainer.appendChild(loadMoreContainer);
    });
  });