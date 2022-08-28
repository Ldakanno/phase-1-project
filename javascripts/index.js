// DOMContentLoaded is used here because defer isnt in our script tags nor is our script
// tag at the bottom of our body in the HTML file, and we want the content desplayed 
document.addEventListener("DOMContentLoaded", () => {
    
    searchForTea();

    displayPopularTea();

})


const ul = document.getElementById("searchedTea");


//     searchForTea() will handle the form that is used to search for a tea name. The user
//  will receive information related to the tea that they searched for only if the tea shop offers it on their menu. 
//  If the tea shop does not have it, an alert will pop up suggesting a proper search term to use or a type of tea that is offered.
function searchForTea() {
    
    const form = document.getElementById("searchForm");
    form.addEventListener("submit", event => {
        
        event.preventDefault(); 
        ul.textContent = "";
        const userSearchInput = event.target.teaName.value.toLowerCase();
        
        
        fetch("http://localhost:3000/teas")
        .then(response => response.json())
        .then(data => {
            
            data.find(element => {
                const oneWordSearch = element.name.split(" ");
                if ( userSearchInput === element.name.toLowerCase() || userSearchInput === oneWordSearch[0].toLowerCase()) {
                    displaySearch(element);
                }
            });
            
        }).catch((error) => {
            console.log(error);
            alert("Whoops! Something went wrong. Please try again.");
        })
        
        form.reset()
    })
    
}









// displaySearch() will create the html elements that the data that is fetched will be placed in to be displayed
function displaySearch(element) {
    
    const img = document.createElement("img");
    img.src = element.image
    
    const h4 = document.createElement("h4");
    h4.textContent = element.name;
    
    const li = document.createElement("li");
    li.textContent = element.description + ` Flavor profile: ${element.flavorProfile}.`;
    
    ul.append(img, h4, li);
    
}




// displayPopularTea() will be used to load info onto the card so users can view what the most popular tea is
function displayPopularTea() {
    fetch("http://localhost:3000/teas/6")
    .then(response => response.json())
    .then(data => {
        console.log("data =>", data);
        const popularCardImg = document.getElementById("popularTeaImg");
        popularCardImg.src = data.image;
        const popularTeaInfo = document.getElementById("popTeaText");
        popularTeaInfo.textContent = `${data.description} Flavor profile: ${data.flavorProfile}.`;
        const popTeaTitle = document.getElementById("popTeaTitle");
        popTeaTitle.textContent = data.name;

    })
    
}