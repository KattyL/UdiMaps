let h2 = document.querySelector('h2');
var map;
var markers = [];

function initMap() {
    var staticLatitude = -18.911392087271167;
    var staticLongitude = -48.275747934658334;

    map = L.map('map').setView([staticLatitude, staticLongitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var otherLocations = [
        { lat: -18.91129,           lon: -48.24164,           text: 'Parque do Sabiá', color: 'green' },
        { lat: -18.89147928043927,  lon: -48.291376476048356, text: 'Ecoponto Roosevelt', color: 'blue' },
        { lat: -18.928613256426907, lon: -48.22215062986038,  text: 'Ecoponto Segismundo Pereira', color: 'blue' },
        { lat: -18.883713366159906, lon: -48.273862226246685, text: 'Ecoponto Santa Rosa', color: 'blue' },
        { lat: -18.96595593636946,  lon: -48.22625072456765,  text: 'Ecoponto São Jorge', color: 'blue' },
        { lat: -18.911734769984804, lon: -48.3058312577018,   text: 'Ecoponto Daniel Fonseca', color: 'blue' },
        { lat: -18.911555457056902, lon: -48.33673186444813,  text: 'Ecoponto Luizote de Freitas', color: 'blue' },
        { lat: -18.927100162039554, lon: -48.33898020003024,  text: 'Ecoponto do Bairro Mansour', color: 'blue' },
        { lat: -18.943563814413082, lon: -48.3190335178213,   text: 'Ecoponto São Lucas', color: 'blue' },
        { lat: -18.866696883199907, lon: -48.28270755585139,  text: 'Ecoponto Cruzeiro do Sul', color: 'blue' },
        { lat: -18.89281205076198,  lon: -48.327195239910736, text: 'Ecoponto Guarani', color: 'blue' },
        { lat: -18.903557818238774, lon: -48.341235086537566, text: 'Ecoponto Tocantins', color: 'blue' },
        { lat: -18.924134598438286, lon: -48.192291200030255, text: 'Ecoponto Morumbi', color: 'blue' },
        { lat: -18.963906149730352, lon: -48.323785739910726, text: 'Ecoponto Jardim Canaã', color: 'blue' },
        { lat: -18.98733729579784,  lon: -48.166251025755415, text: 'Parque Ecológico São Francisco', color: 'green' },
        { lat: -18.918240587720256, lon: -48.323785739910726, text: 'Parque Municipal Luizote de Freitas', color: 'green' },
        { lat: -18.926813444762445, lon: -48.3300093748742,   text: 'Parque Linear Córrego do Óleo', color: 'green' },
        { lat: -18.939370402216884, lon: -48.23883244931213,  text: 'Parque Municipal Santa Luzia', color: 'green' },
        { lat: -18.87266891793004,  lon: -48.28460747633482,  text: 'Parque Municipal Victório Siquierolli', color: 'green' },
        { lat: -18.954543120355325, lon: -48.27995937270753,  text: 'Parque Municipal Gávea', color: 'green' },
        { lat: -18.880335404249145, lon: -48.23144366185689,  text: 'Praça Durval Gomes Xavier', color: 'green' },
        { lat: -18.881905147376138, lon: -48.23632320692973,  text: 'Praça da Calistenia', color: 'green' },
        { lat: -18.880131840661903, lon: -48.2119081433763,   text: 'Praça Anelton Alves da Cunha', color: 'green' },
        { lat: -18.908577295775864, lon: -48.24587638352805,  text: 'Horto Municipal', color: 'blue' },
        { lat: -18.92329587587758,  lon: -48.28174101632871,  text: 'Museu Municipal', color: 'red' },
        { lat: -18.896277184972632, lon: -48.254102910706294, text: 'Museu da Água', color: 'red' },
        { lat: -18.918240970780342, lon: -48.26452070960794,  text: 'Museu do Índio', color: 'red' },
        { lat: -18.919981744626483, lon: -48.26010172986672,  text: 'Museu de Minerais e Rochas', color: 'red' },
        { lat: -18.87263959393752,  lon: -48.284558569575836, text: 'Museu de Biodiversidade do Cerrado', color: 'red' },
        { lat: -18.92444948410564,  lon: -48.28424076326692,  text: 'Museu Universitário de Arte - MUnA', color: 'red' },

    ];

    otherLocations.forEach(function (location) {
        var customIcon = L.icon({
            iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${location.color}.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        var marker = L.marker([location.lat, location.lon], {
            icon: customIcon,
            category: location.color
        }).on('mouseover', function (event) {
            marker.bindPopup(location.text).openPopup();
        }).on('mouseout', function (event) {
            marker.closePopup();
        }).on('click', function (event) {
            var clickedLatLng = event.latlng;
            var nearestMarker = findNearestMarker(clickedLatLng);

            if (nearestMarker) {
                openMarkerInfo(nearestMarker);
            }
        });

        markers.push(marker);
    });

}



function showAllMarkers() {
    markers.forEach(function (marker) {
        map.addLayer(marker);
    });
}

initMap();

const menu = document.querySelector('.menu');
const hideMenuIcon = document.getElementById('hide-menu');
const toggleMenuIcon = document.getElementById('toggle-menu');

function hideMenu() {
    menu.style.display = 'none';
}
function showMenu() {
    menu.style.display = 'flex';
}

function toggleMenu() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        showMenu();
    } else {
        hideMenu();
    }
}

hideMenuIcon.addEventListener('click', hideMenu);
toggleMenuIcon.addEventListener('click', toggleMenu);


function filterMarkers(category) {
    markers.forEach(function (marker) {
        if (marker.options.category === category) {
            map.addLayer(marker);
        } else {
            map.removeLayer(marker);
        }
    });
}


// Aumentar o tamanho do botão Toggle-menu

function hideMenu() {

    const initialScale = 1;
    const targetScale = 2.2;
    let scaleValue = initialScale;

    const scaleInterval = setInterval(() => {
        scaleValue += 0.6;
        toggleMenuIcon.style.transform = `scale(${scaleValue})`;


        if (scaleValue >= targetScale) {
            clearInterval(scaleInterval);
            menu.style.display = 'none';
        }
    }, 30);
}


// Evento de clique no mapa

// map.on('click', function (event) {
//     var clickedLatLng = event.latlng;
//     var nearestMarker = findNearestMarker(clickedLatLng);

//     if (nearestMarker) {
//         openMarkerInfo(nearestMarker);
//     }
// });

function findNearestMarker(clickedLatLng) {
    var nearestMarker = null;
    var nearestDistance = Infinity;

    markers.forEach(function (marker) {
        var markerLatLng = marker.getLatLng();
        var distance = clickedLatLng.distanceTo(markerLatLng);

        if (distance < nearestDistance) {
            nearestMarker = marker;
            nearestDistance = distance;
        }
    });

    return nearestMarker;
}

// Função de informações dos marcadores no mapa

function openMarkerInfo(marker) {
    var markerInfo = {
        'Parque do Sabiá': {
            h1: 'Parque do Sabiá',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Parque Ecológico São Francisco': {
            h1: 'Parque Ecológico São Francisco',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Parque Municipal Luizote de Freitas': {
            h1: 'Parque Municipal Luizote de Freitas',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Parque Linear Córrego do Óleo': {
            h1: 'Parque Linear Córrego do Óleo',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Parque Municipal Santa Luzia': {
            h1: 'Parque Municipal Santa Luzia',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Parque Municipal Victório Siquierolli': {
            h1: 'Parque Municipal Victório Siquierolli',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Parque Municipal Gávea': {
            h1: 'Parque Municipal Gávea',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Praça Durval Gomes Xavier': {
            h1: 'Praça Durval Gomes Xavier',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Praça da Calistenia': {
            h1: 'Praça da Calistenia',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Praça Anelton Alves da Cunha': {
            h1: 'Praça Anelton Alves da Cunha',
            image: 'images/parques.png',
            description: 'No Município de Uberlândia, são mais de 30 milhões de metros quadrados de áreas protegidas, destinadas à proteção e manutenção da diversidade biológica local, seus recursos naturais e culturais associados – o Cerrado e suas variadas fitofisionomias. ',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/meio-ambiente/parques-municipais/'
        },
        'Ecoponto Roosevelt': {
            h1: 'Ecoponto Roosevelt',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Segismundo Pereira': {
            h1: 'Ecoponto Segismundo Pereira',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Santa Rosa': {
            h1: 'Ecoponto Santa Rosa',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto São Jorge': {
            h1: 'Ecoponto São Jorge',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Daniel Fonseca': {
            h1: 'Ecoponto Daniel Fonseca',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto do Bairro Mansour': {
            h1: 'Ecoponto do Bairro Mansour',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto São Lucas': {
            h1: 'Ecoponto São Lucas',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Cruzeiro do Sul': {
            h1: 'Ecoponto Cruzeiro do Sul',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Guarani': {
            h1: 'Ecoponto Guarani',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Tocantins': {
            h1: 'Ecoponto Tocantins',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Morumbi': {
            h1: 'Ecoponto Morumbi',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Jardim Canaã': {
            h1: 'Ecoponto Jardim Canaã',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Ecoponto Luizote de Freitas': {
            h1: 'Ecoponto Luizote de Freitas',
            image: 'images/reciclagem.png',
            description: 'Os EcoPontos recebem diversos tipos de materiais como: entulhos de construção civil, massa verde (galhos e folhas resultantes de podas), recicláveis, entre outros. O objetivo é garantir um destino adequado aos resíduos, evitando o descarte irregular, deixando a cidade mais limpa.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/servicos-dmae/residuos-solidos/coleta-seletiva/'
        },
        'Horto Municipal': {
            h1: 'Horto Municipal',
            image: 'images/reciclagem.png',
            description: 'O Horto municipal de Uberlândia é uma ação de estímulo à arborização da cidade conduzida de forma responsável e consciente, qualquer pessoa que tenha interesse em receber doação de mudas pode se dirigir ao local para a retirada. O número de mudas doadas para cada interessado depende da extensão da propriedade, podendo cada kit variar entre 10 e 50 mudas de espécies variadas.',
            link: 'https://www.uberlandia.mg.gov.br/2023/11/01/prefeitura-inicia-segunda-6-doacao-de-mudas-para-propriedades-rurais/'

        },
        'Museu Municipal': {
            h1: 'Museu Municipal',
            image: 'images/museu.png',
            description: 'Pequeno museu em uma antiga prefeitura histórica com exposições que detalham a origem de Uberlândia.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/secretarias/cultura-e-turismo/museu-municipal/'

        },
        'Museu da Água': {
            h1: 'Museu da Água',
            image: 'images/museu.png',
            description: 'Criado para preservar a memória do saneamento em Uberlândia, o Museu da Água está localizado na sede do Dmae e pode ser visitado das 8h às 17h, de segunda a sexta. É um espaço para a população conhecer o pioneirismo das iniciativas em saneamento. O espaço é composto por peças históricas, linha do tempo e acervo de fotos.',
            link: 'https://www.uberlandia.mg.gov.br/prefeitura/orgaos-municipais/dmae/museu-da-agua/'

        },
        'Museu do Índio': {
            h1: 'Museu do Índio',
            image: 'images/museu.png',
            description: 'Sua coleção etnográfica é composta de cerca de 2.500 objetos de, aproximadamente, 80 grupos indígenas brasileiros. Organizada em diversas tipologias: cerâmica, trançados, plumária, objetos mágicos e lúdicos, indumentária, objetos de uso e conforto doméstico, armas, dentre outras.',
            link: 'https://www.musindioufu.org/'

        },
        'Museu de Minerais e Rochas': {
            h1: 'Museu de Minerais e Rochas',
            image: 'images/museu.png',
            description: 'O Museu de Minerais e Rochas, vinculado ao Instituto de Geografia, tem exposição permanente de minerais, rochas, fósseis e recursos energéticos, como petróleo e carvão mineral. Além de prover material para ensino e pesquisa na área de geologia, recebe visitas da população em geral interessada em entender como a Terra se formou e vem evoluindo ao longo do tempo geológico.',
            link: 'https://ufu.br/unidades-organizacionais/museu-de-minerais-e-rochas'

        },
        'Museu de Biodiversidade do Cerrado': {
            h1: 'Museu de Biodiversidade do Cerrado',
            image: 'images/museu.png',
            description: ' O Museu de Biodiversidade do Cerrado é uma Unidade Especial do Instituto de Biologia da Universidade Federal de Uberlândia. Foi inaugurado em maio de 2000 e configura-se como um espaço de promoção de atividades de divulgação científica sócio-educativas e como núcleo de pesquisa na área da Educação em Ciências.',
            link: 'http://www.mbc.ib.ufu.br/'

        },
        'Museu Universitário de Arte - MUnA': {
            h1: 'Museu Universitário de Arte - MUnA',
            image: 'images/museu.png',
            description: 'O MUnA tem como missão preservar, fomentar e valorizar a produção de artes visuais por meio da promoção de atividades de ensino, pesquisa e extensão universitária; de ações de salvaguarda, ampliação e difusão de seu acervo; e de incentivo ao intercâmbio cultural e científico com instituições pares, buscando estimular a formação de sujeitos críticos e o fortalecimento de relações dialógicas entre seus públicos e o patrimônio cultural sob sua guarda.',
            link: 'http://www.muna.ufu.br/index2.html'

        },
        
    };

    var descriptionDiv = document.querySelector('.description');
    var markerName = marker.getPopup().getContent();

    if (markerInfo.hasOwnProperty(markerName)) {
        var markerData = markerInfo[markerName];

        descriptionDiv.querySelector('h1').textContent = markerData.h1;
        descriptionDiv.querySelector('.image').style.backgroundImage = `url(${markerData.image})`;        descriptionDiv.querySelector('.text-description p').textContent = markerData.description;


        var linkElement = descriptionDiv.querySelector('.description-link');
        linkElement.href = markerData.link;

      
        descriptionDiv.style.display = 'block';
    } else {
       
        descriptionDiv.style.display = 'none';
    }

}

function toggleNext(elem) {
    let next = elem.nextElementSibling;

    if (next.style.display === "none" || next.style.display === "")  {
        next.style.display = "block";
      } else {
        next.style.display = "none";
      }
}





