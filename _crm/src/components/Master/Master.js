import { useContext } from 'react';
import bem from 'easy-bem';
import cn from 'classnames';
import { Button, InputGroup, FormControl, Card } from 'react-bootstrap';
import './Master.scss';

import mastersContext from '../../contexts/mastersContext';

const b = bem('Master');

export default function Master({ master, className }) {
  const { id, photo, fullName, position } = master;
  const _className = cn(b(), className);
  const _photo = photo || 'https://www.travelcontinuously.com/wp-content/uploads/2018/04/empty-avatar.png';

  const { removeMaster } = useContext(mastersContext);

  return (
    <>
      <Card border="info" style={{ width: '15rem' }} className="m-2">
        <Card.Header>          
          <Card.Img className={b('photo')} variant="top" src={_photo} />
        </Card.Header>
        <Card.Body>
          <Card.Title className={b('name')}>{fullName}</Card.Title>
          <Card.Text  className={b('position')}>
            {position}
          </Card.Text>
          <div className="text-right">
            <Button onClick={() => removeMaster(id)}  variant="outline-dark"  size="sm" title="Удалить мастера">X</Button>
            </div>
        </Card.Body>
      </Card>
      <br />
    </>
  );
}