import './Shoes.scss';
import { nanoid } from 'nanoid';

import Input from '../Input/Input';

function Shoes({ updateSize, addShoe, removeShoe, shoes }) {

    const shoeComps = shoes.map((input, index) => {
        console.log("input",input);
        const label = `Shoe size / person ${index + 1}`;
        const testId = `player_shoe_id_${index + 1}`;
        const shoeInput = (
        <article className='shoes__form' key={ input.id }>
            <Input
                testId={testId} 
                label={ label }
                type='number'
                customClass='shoes__input'
                name={ input.id }
                handleChange={ updateSize } />
            <button data-testid='remove_shoe-btn' className='shoes__button shoes__button--small' 
            onClick={ () => { removeShoe(input.id) }}>-</button>
        </article> )

        return shoeInput;
    });

    return (
        <section className="shoes">
            <header>
                <h2 className="shoes__heading">Shoes</h2>
            </header>
            { shoeComps }
            <button data-testid='add_shoe-btn' className="shoes__button" onClick={ () => { addShoe(nanoid()) } }>+</button>
        </section>
    )
}

export default Shoes;