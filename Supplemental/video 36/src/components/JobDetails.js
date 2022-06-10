import {
    state,
    jobDetailsContentEl
} from '../common.js';

const renderJobDetails = jobItem => {
    const jobDetailsHTML = `
        <img src="${jobItem.coverImgURL}" alt="#" class="job-details__cover-img">

        <a class="apply-btn" href="${jobItem.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

        <section class="job-info">
            <div class="job-info__left">
                <div class="job-info__badge">${jobItem.badgeLetters}</div>
                <div class="job-info__below-badge">
                    <time class="job-info__time">${jobItem.daysAgo}d</time>
                    <button class="job-info__bookmark-btn">
                        <i class="fa-solid fa-bookmark job-info__bookmark-icon ${state.bookmarkJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) && 'job-info__bookmark-icon--bookmarked'}"></i>
                    </button>
                </div>
            </div>
            <div class="job-info__right">
                <h2 class="second-heading">${jobItem.title}</h2>
                <p class="job-info__company">${jobItem.company}</p>
                <p class="job-info__description">${jobItem.description}</p>
                <div class="job-info__extras">
                    <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${jobItem.duration}</p>
                    <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${jobItem.salary}</p>
                    <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${jobItem.location}</p>
                </div>
            </div>
        </section>

        <div class="job-details__other">
            <section class="qualifications">
                <div class="qualifications__left">
                    <h4 class="fourth-heading">Qualifications</h4>
                    <p class="qualifications__sub-text">Other qualifications may apply</p>
                </div>
                <ul class="qualifications__list">
                    ${jobItem.qualifications.map(qualificationText => `<li class="qualifications__item">${qualificationText}</li>`).join('')}
                </ul>
            </section>
            
            <section class="reviews">
                <div class="reviews__left">
                    <h4 class="fourth-heading">Company reviews</h4>
                    <p class="reviews__sub-text">Recent things people are saying</p>
                </div>
                <ul class="reviews__list">
                    ${jobItem.reviews.map(reviewText => `<li class="reviews__item">${reviewText}</li>`).join('')}
                </ul>
            </section>
        </div>

        <footer class="job-details__footer">
            <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
        </footer>
    `;
    jobDetailsContentEl.innerHTML = jobDetailsHTML;
};

export default renderJobDetails;