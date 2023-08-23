import { ChangeEvent, MouseEvent, useState } from 'react';
import { ReviewType } from '../../type';

type FormEvaluatorProps = {
  id: string;
  updateReviews: (review: ReviewType) => void;
};

export default function FormEvaluator({ id, updateReviews }: FormEvaluatorProps) {
  const INITIAL_STATE = {
    email: '',
    rating: '',
    message: '',
  };

  const [ratingInfo, setRatingInfo] = useState(INITIAL_STATE);
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRatingInfo({ ...ratingInfo, [name]: value });
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      ratingInfo.email !== ''
      && ratingInfo.rating !== ''
      && /\S+@\S+\.\S+/.test(ratingInfo.email)
    ) {
      const resultData = JSON.parse(localStorage.getItem(id) as string);
      setIsErrorMessage(false);
      if (resultData) {
        updateReviews(ratingInfo);
        localStorage.setItem(id, JSON.stringify([...resultData, ratingInfo]));
      } else {
        updateReviews(ratingInfo);
        localStorage.setItem(id, JSON.stringify([ratingInfo]));
      }
      setRatingInfo(INITIAL_STATE);
    } else {
      setIsErrorMessage(true);
    }
  };

  return (
    <>
      {isErrorMessage && <h3 data-testid="error-msg">Campos inválidos</h3> }
      <form>
        <input
          data-testid="product-detail-email"
          placeholder="Email"
          type="email"
          name="email"
          value={ ratingInfo.email }
          onChange={ (event) => handleChange(event) }
        />

        {[1, 2, 3, 4, 5].map((number) => (
          <section key={ number }>
            <input
              data-testid={ `${number}-rating` }
              type="radio"
              name="rating"
              id={ `ratinhg-${number}` }
              value={ number }
              onChange={ (event) => handleChange(event) }
            />
            <label htmlFor="rating">{number}</label>
          </section>
        ))}

        <textarea
          name="message"
          placeholder="Mensagem(opcional)"
          cols={ 30 }
          rows={ 5 }
          onChange={ (event) => handleChange(event) }
          value={ ratingInfo.message }
          data-testid="product-detail-evaluation"
        />

        <button
          data-testid="submit-review-btn"
          type="submit"
          onClick={ (event) => handleSubmit(event) }
        >
          Avaliar
        </button>
      </form>
    </>
  );
}
