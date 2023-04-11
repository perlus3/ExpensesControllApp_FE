import { GoBackButton } from '../common/buttons/GoBackBtn';

export const About = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <p className="mb-5">
            <h1 className="mt-3 mb-5">
              Ta aplikacja pomoże kontrolować Twoje wydatki!
            </h1>
            <h4>Zarejestruj sie i potwierdz e-mail aby się zalogować.</h4>
            Dodaj swoje konto, a następnie dodawaj na nim operacje by
            kontrolować ile i na co wydajesz pieniędzy.
          </p>
          <GoBackButton />
        </div>
      </div>
    </div>
  );
};
