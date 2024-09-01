document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    if (query === '') {
        alert('الرجاء إدخال نص للبحث.');
        return;
    }

    const books = ['abudawud', 'ahmed', 'bukhari', 'darimi', 'ibnmajah', 'malik', 'muslim', 'nasai', 'tirmidhi'];

    let allResults = [];

    // Fetch and search in all books
    Promise.all(books.map(book => fetch(`./booksOfHadith/${book}.json`)
        .then(response => response.json())
        .then(data => {
            const filteredHadiths = data.hadiths.filter(hadith =>
                hadith.text.toLowerCase().includes(query) ||
                hadith.explanation && hadith.explanation.toLowerCase().includes(query)
            );

            // Add book reference to each result
            return filteredHadiths.map(hadith => ({
                ...hadith,
                book
            }));
        })
    ))
    .then(results => {
        allResults = results.flat();
        displaySearchResults(allResults);
    })
    .catch(error => {
        console.error('Error loading Hadith data:', error);
    });
});

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>لم يتم العثور على نتائج تطابق بحثك.</p>';
        return;
    }

    results.forEach(result => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${result.book} - حديث ${result.number}</h3>
            <p>${result.text}</p>
            ${result.explanation ? `<p><strong>شرح:</strong> ${result.explanation}</p>` : ''}
            <span class="status">${result.status}</span>
        `;
        resultsContainer.appendChild(article);
    });
}
