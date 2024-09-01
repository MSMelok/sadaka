document.addEventListener("DOMContentLoaded", () => {
    const books = [
        { id: 'abudawud', name: 'سنن أبي داود', author: 'الإمام أبي داود' },
        { id: 'ahmed', name: 'مسند الإمام أحمد بن حنبل', author: 'الإمام أحمد بن حنبل' },
        { id: 'bukhari', name: 'صحيح البخاري', author: 'الإمام البخاري' },
        { id: 'darimi', name: 'سنن الدارمي', author: 'الدارمي' },
        { id: 'ibnmajah', name: 'سنن ابن ماجه', author: 'ابن ماجه' },
        { id: 'malik', name: 'موطأ مالك', author: 'الإمام مالك' },
        { id: 'muslim', name: 'صحيح مسلم', author: 'الإمام مسلم' },
        { id: 'nasai', name: 'سنن النسائي', author: 'النسائي' },
        { id: 'tirmidhi', name: 'جامع الترمذي', author: 'الإمام الترمذي' }
    ];

    books.forEach(book => {
        const button = document.getElementById(`${book.id}-button`);
        const content = document.getElementById(`${book.id}-content`);
        const loadingBar = document.getElementById(`${book.id}-loading-bar`);
        const hadithsContainer = document.getElementById(`${book.id}-hadiths`);
        const authorInfo = document.getElementById(`${book.id}-author-info`);
        const sectionTitle = document.getElementById(`${book.id}-section-title`);

        button.addEventListener('click', () => {
            if (content.style.display === "none" || !content.style.display) {
                content.style.display = "block";
                loadingBar.style.display = "block";

                fetch(`./booksOfHadith/${book.name}.json`)
                    .then(response => response.json())
                    .then(data => {
                        // Clear existing hadiths if any
                        hadithsContainer.innerHTML = '';

                        // Process and display the Hadiths
                        data.chapters.forEach(chapter => {
                            const chapterSection = document.createElement('section');
                            chapterSection.classList.add('chapter-section');

                            const chapterTitle = document.createElement('h3');
                            chapterTitle.textContent = chapter.arabic || chapter.english;
                            chapterSection.appendChild(chapterTitle);

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

                            hadithsContainer.appendChild(chapterSection);
                        });

                        loadingBar.style.display = "none";
                    })
                    .catch(error => {
                        console.error('Error loading Hadith data:', error);
                        loadingBar.textContent = 'Error loading data. Please try again later.';
                    });
            } else {
                content.style.display = "none";
            }
        });

        // Add author information
        authorInfo.textContent = `المؤلف: ${book.author}`;

        // Initialize the section as hidden
        content.style.display = "none";
    });
});
