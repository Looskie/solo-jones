$(window).on('load', () => {
    console.log('%c%s', 'color:#fbe177; font-size: 25px;', 'Whatcha snoopin\' fo?');
    console.log('%c%s', 'color:#fbe177; font-size: 13px; font-weight: 200;', '(WEBSITE MADE BY DEVLOOSKIE)');
    $('#homepicture').addClass('expand');
    $('.thirtypiece-scroller, .two').addClass('fastboygozoooooom');
    setTimeout(() => {
        $('.thirtypiece-scroller, .two').removeClass('fastboygozoooooom').addClass('slowboygobruh');
    }, 2545);
    getTestimonial();
})

function play(song) {
    closeOthers();
    switch (true) {
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
    if (!name == "" && !testimonial == "" && name.length <= 12) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, country, testimonial })
        }
        fetch('/postTestimonial', options)
            .then(res => res.json())
            .then(json => {
                if (json.status == 'success') {
                    localStorage.setItem('ID', json.id);
                    localStorage.setItem('message', testimonial);
                    getTestimonial();
                    castSuccess('Success!');
                } else {
                    castError('An error occured!');
                }
            })
            .catch(err => castError('Error! You\'ve already posted a testimonial!'))
    } else {
        if (name == "") {
            castError('You need to enter a name!');
        } else if (testimonial == "") {
            castError('You need to have a testimonial!')
        } else {
            castError('Your name is too long! (Over 12 characters)');
        }
    }
}

function castError(err) {
    $(`<div class="error"> <h6 class="error">${err}</h6></div>`).appendTo('.errorsAndSuccesses');
    setTimeout(() => $('.success').fadeOut(1500), 3000);
}

function castSuccess(succ) {
    $(`<div class="success"> <h6 class="success">${succ}</h6></div>`).appendTo('.errorsAndSuccesses');
    setTimeout(() => $('.success').fadeOut(1500), 3000);
}

async function checkId(method) {
    const name = document.getElementById('name'),
        country = document.getElementById('country'),
        testimonial = document.getElementById('testimonial'),
        submitbtn = document.getElementById('submitbtn'),
        id = localStorage.getItem('ID');
    if (id) {
        const checkIdOptions = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: (JSON.stringify({ id })) }
        fetch('/checkID', checkIdOptions)
            .then(res => res.json())
            .then(json => {
                if (json.status == 'success') {
                    name.value = json.data[0].name;
                    country.value = json.data[0].country;
                    testimonial.value = json.data[0].testimonial;
                    location.href = "#testipost";
                    if (method == 'editPost()') {
                        submitbtn.textContent = 'EDIT POST';
                        submitbtn.setAttribute('onClick', 'editPost()');
                    } else {
                        deletePost();
                    }
                } else {
                    castError('Error! There was a problem getting your post!');
                }
            })
    } else {
        castError('Couldn\'t find your post!');
    }
}

function editPost() {
    const nameVal = document.getElementById('name').value,
        countryVal = document.getElementById('country').value,
        testimonialVal = document.getElementById('testimonial').value,
        id = localStorage.getItem('ID');
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nameVal, countryVal, testimonialVal, id }) }
    fetch('/changeTestimonial', options)
        .then(response => response.json())
        .then(json => {
            if (json.status == 'success') {
                getTestimonial();
                castSuccess('Successfully edited your post!');
                localStorage.setItem('message', testimonialVal);
            } else {
                castError('There was an error whilst editing your testimonial!');
            }
            submitbtn.textContent = 'SUBMIT';
            submitbtn.setAttribute('onClick', 'postTestimonial()');
        })
}
function deletePost() {
    const id = localStorage.getItem('ID');
    const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }
    fetch('/deleteTestimonial', options)
        .then(res => res.json())
        .then(json => {
            if (json.status == 'success') {
                getTestimonial();
                $('.editbtn, .deletebtn').remove();
                castSuccess('Successfully deleted your post!');
            } else {
                castError('Error! There was an error trying to delete your post!');
            }
        })
}

function getTestimonial() {
    fetch('/getTestimonial')
        .then(res => res.json())
        .then(json => {
            for (var i = 0; i <= json.length - 1; i++) {
                if (localStorage.getItem('message') == json[`${i}`].testimonial) {
                    $(`<button class="editbtn" onclick="checkId('editPost()')">Edit</button> <button class="deletebtn" onclick="checkId('deletePost()')">Delete</button>`).appendTo(`#buttons${i}`);
                }
                document.getElementById(`namefield${i}`).textContent = json[`${i}`].name;
                document.getElementById(`countryfield${i}`).textContent = '(' + json[`${i}`].country + ')';
                document.getElementById(`messagefield${i}`).textContent = json[`${i}`].testimonial;
            }
        })
        .catch(err => castError('An error occured whilst fetching testimonials'));
}
// Scroller //
new ScrollBooster({
    viewport: document.querySelector('.testimonials'),
    content: document.querySelector('.scroll-this'),
    scrollMode: 'transform',
    direction: 'horizontal'
});