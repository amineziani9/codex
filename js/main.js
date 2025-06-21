// Script principal

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/content.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const path = window.location.pathname.split('/').pop() || 'index.html';

      if (path === 'index.html') {
        const hero = document.querySelector('.hero');
        if (hero) {
          const h1 = hero.querySelector('h1');
          const p = hero.querySelector('p');
          const btn = hero.querySelector('a');
          if (h1) h1.textContent = data.hero.title;
          if (p) p.textContent = data.hero.subtitle;
          if (btn) btn.textContent = data.hero.cta;
        }

        const missionSection = document.querySelector('.mission p');
        if (missionSection) {
          missionSection.textContent = data.mission;
        }

        const valuesList = document.querySelector('.valeurs ul');
        if (valuesList) {
          valuesList.innerHTML = '';
          data.values.forEach((val) => {
            const li = document.createElement('li');
            li.textContent = val;
            valuesList.appendChild(li);
          });
        }
      } else if (path === 'cours.html') {
        const main = document.querySelector('main');
        if (main) {
          const coursesTitle = document.createElement('h2');
          coursesTitle.textContent = 'Cours';
          const coursesList = document.createElement('ul');
          data.courses.forEach((course) => {
            const li = document.createElement('li');
            li.textContent = `${course.type} - ${course.students} élèves - ${course.price}€/h - Niveau ${course.level}`;
            coursesList.appendChild(li);
          });

          const resourcesTitle = document.createElement('h2');
          resourcesTitle.textContent = 'Ressources';
          const resourcesList = document.createElement('ul');
          data.resources.forEach((res) => {
            const li = document.createElement('li');
            li.textContent = res;
            resourcesList.appendChild(li);
          });

          main.appendChild(coursesTitle);
          main.appendChild(coursesList);
          main.appendChild(resourcesTitle);
          main.appendChild(resourcesList);
        }
      } else if (path === 'team.html') {
        const main = document.querySelector('main');
        if (main) {
          const list = document.createElement('ul');
          data.team.forEach((member) => {
            const li = document.createElement('li');
            li.textContent = `${member.name} - ${member.school}`;
            list.appendChild(li);
          });
          main.appendChild(list);
        }
      } else if (path === 'contact.html') {
        const main = document.querySelector('main');
        if (main) {
          const email = document.createElement('p');
          email.textContent = `Email : ${data.contact.email}`;
          const phone = document.createElement('p');
          phone.textContent = `Téléphone : ${data.contact.phone}`;
          const instructions = document.createElement('p');
          instructions.textContent = data.contact.instructions;
          main.appendChild(email);
          main.appendChild(phone);
          main.appendChild(instructions);
        }
      }
    })
    .catch((error) => {
      console.error('Erreur lors du chargement du contenu', error);
    });
});
