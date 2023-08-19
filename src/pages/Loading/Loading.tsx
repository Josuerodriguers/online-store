import { PacmanLoader } from 'react-spinners';
import style from './style.module.css';

export default function Loading() {
  return (
    <section className={ style.containerLoading }>
      <section className={ style.loading }>
        <PacmanLoader size="150px" color="#949494" />
      </section>
    </section>
  );
}
