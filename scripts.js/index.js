const createElement = (arr) => {
    const htmlElement = arr.map((el) => `<button class="btn btn-soft btn-success">${el}</button>`)
    return htmlElement.join(" ");
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove("hidden")
        document.getElementById('word-container').classList.add("hidden")
    }
    else {
        document.getElementById('word-container').classList.remove("hidden")
        document.getElementById('spinner').classList.add("hidden")
    }
}




const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then((json) => displayLesson(json.data)
        )
};


const loadLevelWord = (id) => {
manageSpinner(true);
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayWord(data.data))

}
 




const displayWord = (words) => {

    // get the parent
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = "";
    // create element

    words.forEach(word => {

        const btnWord = document.createElement('div');
        btnWord.innerHTML = `
         <div class="word-card bg-white text-center py-10 px-5 rounded-xl shadow-sm space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning / Pronunciation</p>
            <p class="font-bangla  font-medium">"${word.meaning ? word.meaning : "Meaning Not detected"} / ${word.pronunciation}"</p>
            <div class="flex justify-between items-center">
               <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a90ff10] hover:bg-[#1a90ff80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1a90ff10] hover:bg-[#1a90ff80] "><i class="fa-solid fa-volume"></i></button>
            </div>
        </div>
        
        `
        wordContainer.append(btnWord)
    })
     manageSpinner(false);

}

// modol part

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)




}



const displayWordDetails = (word) => {

    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
      <h3 class="text-lg font-bold">${word.word}(${word.pronunciation}))</h3>
                <p class="pt-4  font-semibold">Meaning</p>
                <p class="  font-semibold font-bangla">${word.meaning}</p>
                <p class="pt-4  font-bold">Example</p>
                <p class=" ">${word.sentence}</p>
                <p class=" pt-4 font-bangla ">সমার্থক শব্দ গুলো</p>

                <div class="flex gap-3">
                    ${createElement(word.synonyms)}
                </div>`
    document.getElementById("word_modal").showModal();

   

};







const displayLesson = (lessons) => {
    // Get the parent
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = "";
    lessons.forEach(lesson => {

        // cerate element
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
         <button id="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        // appemd the child
        levelContainer.append(btnDiv)

    });
    
}
loadLesson()


