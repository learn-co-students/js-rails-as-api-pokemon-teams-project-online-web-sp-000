const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    const html = data.map(trainer => {
        return `
        <div class="card"><p>${trainer.name}</p>
            <ul>
                <li>${trainer.pokemon}</li>
            </ul>        
        </div>
        `;
    }).join('');
    console.log(html)
    document.querySelector('#roster').innerHTML = html;
    // show(data);
}

// Calling that async function 
getapi(TRAINERS_URL);

function fetchData() {
    console.log("Start Fetch");
}
fetchData();

// function show(data) {
//     let tab =  
//         `<tr> 
//           <th>Trainer</th> 
//           <th>Office</th> 
//           <th>Position</th> 
//           <th>Salary</th> 
//          </tr>`; 

//     let member =
//         <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>

    
//     // Loop to access all rows  
//     for (let r of data.list) { 
//         tab += `<tr>  
//         <td>${r.name} </td> 
//         <td>${r.office}</td> 
//         <td>${r.position}</td>  
//         <td>${r.salary}</td>           
//         </tr>`; 
//         } 
//     document.getElementById("trainers").innerHTML += tab; 

//     {/* <div class="card" data-id="1"><p>Prince</p>
//             <button data-trainer-id="1">Add Pokemon</button>
//             <ul>
//             <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//             <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//             <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//             <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//             <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//             </ul>
//         </div>

//             <!-- table for showing data -->
//             <table id="trainers"></table>  */}
// }

