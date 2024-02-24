import styles from './styles.module.css'
export function LoaderSpinner() {
  return (
    <div className="flex flex-1 justify-center items-center w-full h-[90vh]">
      <span className={styles.loader}></span>
    </div>
  )
}
