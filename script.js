document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    searchButton.addEventListener('click', () => {
        performSearch(searchBar.value);
    });

    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchBar.value);
        }
    });

    function performSearch(query) {
        // Remove any previous search results
        const previousResults = document.querySelector('.search-results');
        if (previousResults) previousResults.remove();

        // Make sure query is not empty
        if (query.trim() === '') return;

        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';

        // Example static data (replace with fetched data)
        const hadiths = [
            {
                book: 'صحيح البخاري',
                text: 'بني الإسلام على خمس',
                status: 'صحيح'
            },
            {
                book: 'صحيح مسلم',
                text: 'إنما الأعمال بالنيات',
                status: 'صحيح'
            },
            // Add more hadiths
        ];

        // Filter the data based on the query
        const filteredResults = hadiths.filter(hadith => 
            hadith.text.includes(query) || hadith.book.includes(query)
        );

        if (filteredResults.length === 0) {
            searchResults.innerHTML = '<p>لم يتم العثور على نتائج.</p>';
        } else {
            filteredResults.forEach(result => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h3>${result.book}</h3>
                    <p>${result.text}</p>
                    <span class="status">${result.status}</span>
                `;
                searchResults.appendChild(article);
            });
        }

        document.querySelector('.container').appendChild(searchResults);
    }
});
