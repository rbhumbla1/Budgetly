async function newFormHandler(event) {
    event.preventDefault();
    const category = document.querySelector('#category').value;
    const amount = document.querySelector('#amount').value;


    const response = await fetch(`/api/goals`, {
        method: 'POST',
        body: JSON.stringify({
          category,
          amount,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

    if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add goal');
      }
    }

document.querySelector('.new-goal-form').addEventListener('submit', newFormHandler);
