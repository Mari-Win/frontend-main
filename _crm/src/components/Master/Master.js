import { useContext } from 'react';
import bem from 'easy-bem';
import cn from 'classnames';
import './Master.scss';

import mastersContext from '../../contexts/mastersContext';

const b = bem('Master');

export default function Master({ master, className }) {
  const { id, photo, fullName, position } = master;
  const _className = cn(b(), className);
  const _photo = photo || 'https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png';

  const { removeMaster } = useContext(mastersContext);

  return (
    <div className={_className}>
      <div className={b('photo')}>
        <img src={_photo} />
      </div>

      <div className={b('name')}>{fullName}</div>
      <div className={b('position')}>{position}</div>

      <button onClick={() => removeMaster(id)}>X</button>
    </div>
  );
}