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
            articleElement.className = 'row g-0 border rounded overflow-hidden flex-md-row mb-1 shadow-sm h-md-250 position-relative article';
            articleElement.innerHTML = `
                <div class="col p-4 d-flex flex-column position-static">
                    <a href="/${article.categorySlug }" class="d-inline-block mb-2 text-success text-decoration-none">${article.category }</a>
                    <div class="d-flex">
                        <div>
                            <h3 class="mb-0"><a href="/posts/${article.slug }/${article.id }" class="text-decoration-none text-dark">${article.title }</a></h3>
                            <div class="mb-1 text-muted">${article.updatedAt }</div>
                            <p class="card-text mb-auto" 
                            style="overflow: hidden; 
                            display: -webkit-box; 
                            -webkit-line-clamp: 2;
                            line-clamp: 2;
                            -webkit-box-orient: vertical;">
                            ${article.intro }
                            </p>
                        </div>
                        <div class="col-auto d-none d-lg-block">
                            <img class="bd-placeholder-img rounded" width="200" height="120" src="https://files.fullstack.edu.vn/f8-prod/blog_posts/6936/6422afa5a62f8.jpg"></img>
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