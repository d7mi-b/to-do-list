import Side from '../components/Side';
import Header from '../components/Header';
import style from '../styles/about.module.css';

const strategies = [
    {
        id: 1,
        title: 'Do First',
        description: 'First focus on important tasks to be done the same day.'
    },
    {
        id: 2,
        title: 'Do Later',
        description: 'Important, but not-so-urgent stuff should be scheduled.'
    },
    {
        id: 3,
        title: 'Delegate',
        description: 'What’s urgent, but less important, delegate to others.'
    },
    {
        id: 4,
        title: "Don't Do",
        description: 'What’s neither urgent nor important, don’t do at all.'
    },
]

function About () {
    return (
        <div className={`page home`}>
            <Side />
            <div className="container">
                <Header />
                <section className={style.about}>
                    <article>
                        <header>
                            <h2>What is the Eisenhower Matrix?</h2>
                        </header>
                        <p>
                            The Eisenhower Matrix, also referred to as Urgent-Important Matrix,
                            helps you decide on and prioritize tasks by urgency and importance, 
                            sorting out less urgent and important tasks which you should either 
                            delegate or not do at all.
                        </p>
                    </article>
                    <article>
                        <header>
                            <h2>How to use the Eisenhower Matrix?</h2>
                        </header>
                        <p>
                            Prioritizing tasks by urgency and importance results 
                            in 4 quadrants with different work strategies:
                        </p>
                    </article>
                    <section className={style.strategies}>
                        {
                            strategies.map(e => {
                                return (
                                    <article className={style.strategie} key={e.id}>
                                        <header>
                                            <h3><span>{e.id}</span> {e.title}</h3>
                                        </header>
                                        <p>{e.description}</p>
                                    </article>
                                );
                            })
                        }
                    </section>
                </section>
            </div>
        </div>
    );
}

export default About;