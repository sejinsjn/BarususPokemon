import styles from './Section.module.css';

export default function Section({ title, id, content }) {
    if(title != null || id != null || content != null)
        return (
            <section className={styles.section} id={id}>
                <div className={styles.title}>
                    <h1>{title}</h1>
                </div>
                <div className={styles.content}>
                    {content()}
                </div>
            </section>
        );
    else
        return <></>;
};