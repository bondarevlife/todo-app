const weekDay = document.querySelector(".week-day");
const dayAndMonth = document.querySelector(".thin")
const time = document.querySelector(".time")
const taskList = document.querySelector("ul")
const createdNum = document.querySelector(".created-n")
const completedNum = document.querySelector(".completed-n")


let wDay = new Date().getDay();
let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Cуббота"]
weekDay.textContent = days[wDay]

let monthDay = new Date().getMonth();
let day = new Date().getDate()
let months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек']
dayAndMonth.textContent = `${day} ${months[monthDay]}`

setInterval(() => {
    let t = new Date().toLocaleTimeString()
    time.textContent = t
}, 1000)

let tasks = [{
        label: "Сходить в собеседование",
        completed: false,
        id: 0
    },
    {
        label: "Сходить в магаз",
        completed: true,
        id: 1
    },
    {
        label: "Сходить в качалку",
        completed: true,
        id: 2
    },
    {
        label: "Сходить в туалет",
        completed: false,
        id: 3
    },
    {
        label: "Сходить в зал",
        completed: false,
        id: 4
    }
]

const render = (tasks) => {
    let renderTasks = (tasks) => {
        taskList.textContent = ""
        tasks.map((task) => {
            let done = task.completed ? 'done' : ''
            taskList.insertAdjacentHTML("beforeend", `<li data-id="${task.id}" class="task">
            <button class="complete">
            <svg

                        class="icon-done"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-check-circle"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path
                            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
                        />
                    </svg>
            
            </button>        
                    <h2 class="label ${done}">${task.label}</h2>
                    <button class="trash-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                        </svg>
                    </button>
                </li>`)
        })
        let delBtns = document.querySelectorAll(".trash-btn")
        delBtns.forEach((b) => {
            b.addEventListener('click', (e) => {
                let idX = e.target.parentNode.parentNode.dataset.id
                if (idX == undefined) return;
                tasks = tasks.filter((task) => {
                    return task.id != idX
                })
                render(tasks)
            })


        })
        createdNum.textContent = tasks.length
        let completedArr = tasks.filter((t) => {
            return t.completed
        })
        completedNum.textContent = completedArr.length
        let completedBtns = document.querySelectorAll('.complete')
        completedBtns.forEach((b) => {
            b.addEventListener('click', (e) => {
                let idX = e.target.parentNode.parentNode.dataset.id
                let elem = document.querySelector(`li[data-id='${idX}']`)
                // console.log(idX, elem)
                if (idX == undefined || elem == null) return;
                elem.childNodes[3].classList.toggle('done')
                completedNum.textContent = document.querySelectorAll('.done').length

            })
        })
    }
    const form = document.querySelector("form");
    const input = document.querySelector("input");

    form.addEventListener("submit", (e) => {
        e.preventDefault() // сброс перезагрузки страницы
        if (!input.value) return
        tasks.push({
            label: input.value,
            completed: false,
            id: tasks.length,

        });
        renderTasks(tasks)
        input.value = ""
    })


    renderTasks(tasks)

}
render(tasks)

// const getPhoto = async () => {
//     const resp = await fetch('https://jsonplaceholder.typicode.com/photos')
//     const photo = await resp.json()
//     console.log(photo)
// }
// getPhoto()