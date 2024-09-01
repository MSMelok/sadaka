document.addEventListener("DOMContentLoaded", () => {
    const books = [
        'abudawud', 'ahmed', 'bukhari', 'darimi', 'ibnmajah', 'malik', 'muslim', 'nasai', 'tirmidhi'
    ];

    const container = document.getElementById('hadith-container');

    books.forEach(book => {
        fetch(`./booksOfHadith/${book}.json`)
            .then(response => response.json())
            .then(data => {
                // Create and insert book section
                const section = createBookSection(data);
                container.appendChild(section);
            })
            .catch(error => console.error('Error loading Hadith data:', error));
    });
});

function createBookSection(data) {
    const section = document.createElement('section');
    section.classList.add('section');
    
    // Book Title and Author
    const title = document.createElement('h2');
    title.textContent = data.metadata.arabic.title || data.metadata.english.title;
    section.appendChild(title);

    const author = document.createElement('h3');
    author.textContent = `المؤلف: ${data.metadata.arabic.author || data.metadata.english.author}`;
    section.appendChild(author);

    // Create sections for chapters
    data.chapters.forEach(chapter => {
        const chapterSection = document.createElement('section');
        chapterSection.classList.add('chapter-section');

        const chapterTitle = document.createElement('h3');
        chapterTitle.textContent = chapter.arabic || chapter.english;
        chapterSection.appendChild(chapterTitle);

        // Create articles for each Hadith in the chapter
        data.hadiths
            .filter(hadith => hadith.chapterId === chapter.id)
            .forEach(hadith => {
                const article = document.createElement('article');
                
                const hadithNumber = document.createElement('h4');
                hadithNumber.textContent = `حديث ${hadith.idInBook}`;
                article.appendChild(hadithNumber);
                
                const hadithText = document.createElement('p');
                hadithText.textContent = hadith.arabic;
                article.appendChild(hadithText);

                const status = document.createElement('span');
                status.classList.add('status');
                status.textContent = hadith.english ? 'صحيح' : 'ضعيف'; // Adjust based on the hadith status
                article.appendChild(status);

                chapterSection.appendChild(article);
            });
        
        section.appendChild(chapterSection);
    });

    return section;
}
