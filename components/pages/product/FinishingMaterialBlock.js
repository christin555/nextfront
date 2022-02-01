import React from 'react';
import s from "./Product.module.scss";
import {finishing} from '../../../src/enums';

const names = {
    [finishing.MATERIAL]: 'Материал отделки',
    [finishing.WINDOW]: 'Варианты остекления',
    [finishing.PHOTO]: 'Варианты фотопечати'
}

const FinishingMaterialBlock = (props) => {

    const {fields} = props;
    const finishingMaterial = fields.find(({name}) => name === 'finishingMaterial')?.values;

    if (!finishingMaterial) {
        return null;
    }

    const blocks = [];

    [finishing.MATERIAL, finishing.WINDOW, finishing.PHOTO].forEach((material) => {
        const materials = finishingMaterial[material];

        if (materials?.length) {
            blocks.push(
                <div className={s.materials}>
                    <span> {names[material]} </span>
                    <div className={s.items}> {
                        materials.map(({id, name, img}) => (
                            <div key={id}>
                                <div className={s.materialImg}>
                                    <img alt={name} src={img}/>
                                </div>
                                {name && <span>{name}</span> || null}
                            </div>
                        ))
                    }
                    </div>
                </div>
            )
        }
    })

    return blocks.length && blocks || null;
}

export default FinishingMaterialBlock;
