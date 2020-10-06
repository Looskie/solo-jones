$(window).on('load', () => {
    $('#homepicture').addClass('expand');
    $('.thirtypiece-scroller, .two').addClass('fastboygozoooooom');
    setTimeout(() => {
        $('.thirtypiece-scroller, .two').removeClass('fastboygozoooooom').addClass('slowboygobruh');
    }, 2545);
    getTestimonial();
})

function play(song) {
    closeOthers();
    switch(true) {
        case song == 'THIRTYPIECE':
            $('#THIRTYPIECEimg, #THIRTYPIECE').addClass('toggleOff');
            $('#THIRTYPIECEselector').removeClass('toggleOff').addClass('toggleOn');
            break;
        case song == 'BIG TOE':
            $('#BIGTOEimg, #BIGTOE').addClass('toggleOff');
            $('#BIGTOEselector').removeClass('toggleOff').addClass('toggleOn');
            break;
        case song == 'NOTES':
            $('#NOTESimg, #NOTES').addClass('toggleOff');
            $('#NOTESselector').removeClass('toggleOff').addClass('toggleOn');
            break;
        case song == 'BAD DECISIONS':
            $('#BADDECISIONSimg, #BADDECISIONS').addClass('toggleOff');
            $('#BADDECISIONSselector').removeClass('toggleOff').addClass('toggleOn');
            break;
        default:
            console.log('ERROR: Song not found!');
    }
    function closeOthers() {
        $('#BIGTOEimg, #NOTESimg, #BADDECISIONSimg, #THIRTYPIECEimg').removeClass('toggleOff').addClass('toggleOn');
        $('#BIGTOEselector, #NOTESselector, #BADDECISIONSselector, #THIRTYPIECEselector').removeClass('toggleOn');
        $('#BIGTOE, #NOTES, #BADDECISIONS, #THIRTYPIECE').removeClass('toggleOff');
    }
}

async function postTestimonial() {
    const name = document.getElementById('name').value,
          country = document.getElementById('country').value,
          testimonial = document.getElementById('testimonial').value;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, country, testimonial})
    }
    fetch('/postTestimonial', options)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        localStorage.setItem('ID', json.id);
        getTestimonial();
    })
    .catch(err => console.log(`Some type of error happened I have no idea what type of error could happen but here it is \n ${err}`))
}

async function editTestimonial() {
    const name = document.getElementById('name').value,
          country = document.getElementById('country').value,
          testimonial = document.getElementById('testimonial').value,
          id = localStorage.getItem('ID');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, country, testimonial, id})
    }
    const res = await fetch('/changeTestimonial', options);
    const json = await res.json();
    console.log(json);
    getTestimonial();
}

function getTestimonial() {
    fetch('/getTestimonial')
    .then(res => res.json())
    .then(json => {
        for(var i = 0; i <= 4; i++ ) {
            document.getElementById(`namefield${i}`).textContent = json[`${i}`].name;
            document.getElementById(`countryfield${i}`).textContent = json[`${i}`].country;
            document.getElementById(`messagefield${i}`).textContent = json[`${i}`].testimonial;
        }
    })
}
// Scroller //
new ScrollBooster({
    viewport: document.querySelector('.testimonials'),
    content: document.querySelector('.scroll-this'),
    scrollMode: 'transform',
    direction: 'horizontal'
});