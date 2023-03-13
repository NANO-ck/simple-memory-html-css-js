//Etape 1 : Préambule
let img_cartes = document.getElementsByClassName("carte");
let retournees = [];  //Contient les numéros de cases dont l'image est visible
let paires = 0;
let coups = 0;

//Etape 2 : Mélange des images
function construct_tab(nb)
{
	let tab = [];
	for (let i=0; i<nb; i++)
	{
		tab.push(i);  //Permet d'ajouter un élément à un tableau
		tab.push(i);
	}
	return tab;
}


//Fonction mélangeant le tableau tab //
function melange(tab)
{
	for (let i=0; i<tab.length; i++)
	{
		let j = i + Math.floor(Math.random() * (tab.length - i));
        [tab[i], tab[j]] = [tab[j], tab[i]] ;
	}
	return tab
}		


//Etape 3 : Placement des images --
function initialise()
{
	console.log("Initialisation en cours....")
	for (i=0; i<tab.length; i++)
	{
		img_cartes[i].setAttribute("num_img", tab[i]); // Créer un attribut num_img pour chaque image de img_cartes qui vaut tab[i] -- 
		img_cartes[i].setAttribute("case", i); // Créer un attribut case pour chaque image qui vaut i --
		img_cartes[i].setAttribute("flip", 0); // Créer un attribut flip pour chaque image qui vaut 0 (0:face cachée, 1:face visible) -- 
        img_cartes[i].setAttribute("src", "Photos/dos.png"); // Modifier l'attribut src de chaque image pour afficher la face cachée --
		// opacité à 1
		img_cartes[i].style.opacity = 1;
	}
	// Remise à zéro des variables
	retournees = [];
	paires = 0;
	coups = 0;
	// Affichage du nombre de coups
	document.getElementById("score").innerText = "En attente de votre premier coup";
}

//Etape 4 : Retournement des images
function retourne(i)
{
	let num_img = img_cartes[i].getAttribute("num_img");
	if (img_cartes[i].getAttribute("flip") == 0)
	{
		// Afficher l'image correspondante face visible
		img_cartes[i].setAttribute("src", "Photos/memory/" + num_img + ".jpg");
		// Modifier l'attribut flip
		img_cartes[i].setAttribute("flip", 1);
	}	
	else
	{
		// Afficher l'image face cachée
		img_cartes[i].setAttribute("src", "Photos/dos.png");
		// Modifier l'attribut flip
		img_cartes[i].setAttribute("flip", 0);
	}
}

function retourne2(i, j)
{
	// Afficher l'image face cachée
	img_cartes[i].setAttribute("src", "Photos/dos.png");
	// Modifier l'attribut flip
	img_cartes[i].setAttribute("flip", 0);
	// Afficher l'image face cachée
	img_cartes[j].setAttribute("src", "Photos/dos.png");
	// Modifier l'attribut flip
	img_cartes[j].setAttribute("flip", 0);
}


// Etape 5 : Fonction principale du jeu --
// Etape 5 : Fonction principale du jeu
function jeu(carte)
{
	console.log(retournees)
	let i = carte.getAttribute("case");
	if (retournees.length < 2 & img_cartes[i].getAttribute("flip") == 0)
	{
		console.log("flipping")
		// Retourner l'image i
		retourne(i);
		// Ajouter i au tableau retournees (à l'aide de push)
		retournees.push(i);
	}
	if (retournees.length == 2)
	{
		console.log("checking")
		coups++;
		let i = retournees.pop();
		let j = retournees.pop();
		if (img_cartes[i].getAttribute("num_img") == img_cartes[j].getAttribute("num_img"))
		{
			img_cartes[i].style.opacity = 0.2;
			img_cartes[j].style.opacity = 0.2;
			// Si la bonne paire a été formée, modifier le nombre de paires formées en conséquence
			paires++;
			// Ajouter la classe right à l'element table
			document.getElementsByTagName("table")[0].classList.add("right");
			const audio = new Audio('AUDIO/right.mp3');
			audio.play();
			setTimeout(() => {
				document.getElementsByTagName("table")[0].classList.remove("right");
			}, 800)
			
			// Modifier le score
		}
		else
		{
			console.log("unflipping")
			// Ajouter la classe wrong à l'element table
			document.getElementsByTagName("table")[0].classList.add("wrong");
			// setTimeout(retourne2, 800, i, j);
			setTimeout(() => {
				retourne2(i, j);
				document.getElementsByTagName("table")[0].classList.remove("wrong");
			}, 800)
		}
	}
	document.getElementById("score").innerText =  paires + " paires en " + coups + " coups";
	if (paires == 6)
	{
		alert("Bravo, vous avez gagné en " + coups + " coups !");
		const audio = new Audio('AUDIO/game-over.mp3');
		audio.play();
	}
}

function rejouer()
{
	for(let i=0; i<img_cartes.length; i++)
	{		
		img_cartes[i].style.opacity=1;
		retournees = [];
		tab = melange(construct_tab(6));
		paires = 0;
		initialise(tab);
	}
}


let tab = melange(construct_tab(6));
initialise(tab);

