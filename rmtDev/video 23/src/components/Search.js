import {
    BASE_API_URL,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';

const submitHandler = event => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = '';

    // render spinner
    renderSpinner('search');

    // fetch search results
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) { // 4xx, 5xx status code
                throw new Error('Resource issue (e.g. resource doesn\'t exist) or server issue');
            }

            return response.json();
        })
        .then(data => {
            // extract job items
            const { jobItems } = data;

            // remove spinner
            renderSpinner('search');

            // render number of results
            numberEl.textContent = jobItems.length;

            // render job items in search job list
            renderJobList(jobItems);
        })
        .catch(error => { // network problem or other errors (e.g. trying to parse something not JSON as JSON)
            renderSpinner('search');
            renderError(error.message);
        });
};

searchFormEl.addEventListener('submit', submitHandler);