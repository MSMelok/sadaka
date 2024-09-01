document.addEventListener("DOMContentLoaded", () => {
    const books = {
        'abudawud': 'سنن أبي داود',
        'ahmed': 'مسند الإمام أحمد بن حنبل',
        'bukhari': 'صحيح البخاري',
        'darimi': 'سنن الدارمي',
        'ibnmajah': 'سنن ابن ماجه',
        'malik': 'موطأ مالك',
        'muslim': 'صحيح مسلم',
        'nasai': 'سنن النسائي',
        'tirmidhi': 'جامع الترمذي'
    };

    Object.keys(books).forEach(book => {
        const button = document.getElementById(`${book}-button`);
        const content = document.getElementById(`${book}-content`);
        const loadingBar = document.getElementById(`${book}-loading-bar`);
        const hadithContainer = document.getElementById(`${book}-hadiths`);

        button.addEventListener('click', () => {
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'block';
                loadingBar.style.display = 'block';
                fetch(`./booksOfHadith/${book}.json`)
                    .then(response => response.json())
                    .then(data => {
                        loadingBar.style.display = 'none';
                        hadithContainer.innerHTML = createBookSection(data);
                    })
                    .catch(error => {
                        loadingBar.style.display = 'none';
                        console.error('Error loading Hadith data:', error);
                    });
            } else {
                content.style.display = 'none';
            }
        });
    });
});

function createBookSection(data) {
    let html = `<h2>${data.metadata.arabic.title || data.metadata.english.title}</h2>`;
    html += `<h3>المؤلف: ${data.metadata.arabic.author || data.metadata.english.author}</h3>`;
    
    data.chapters.forEach(chapter => {
        html += `<section class="chapter-section">
                    <h3>${chapter.arabic || chapter.english}</h3>`;
        
        data.hadiths
            .filter(hadith => hadith.chapterId === chapter.id)
            .forEach(hadith => {
                html += `<article>
                            <h4>حديث ${hadith.idInBook}</h4>
                            <p>${hadith.arabic}</p>
                            <span class="status">${hadith.english ? 'صحيح' : 'ضعيف'}</span>
                        </article>`;
            });
        
        html += `</section>`;
    });

    return html;
}
