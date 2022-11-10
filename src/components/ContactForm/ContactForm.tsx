import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseMake, chooseModel, chooseYear, chooseColor } from '../../Redux/Slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../api';

interface ContactFormProps {
    id?:string;
    data?:{}
}

interface ContactState {
    make: string;
    model: string;
    year: string;
    color: string;
}

export const ContactForm = (props:ContactFormProps) => {

    const dispatch = useDispatch(); // This is a Redux-specific hook that updates the store
    const store = useStore();
    const name = useSelector<ContactState>(state => state.model);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseMake(data.make));
            dispatch(chooseModel(data.model));
            dispatch(chooseYear(data.year));
            dispatch(chooseColor(data.color));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }


    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Vehicle Make</label>
                    <Input {...register('make')} name="make" placeholder='Vehicle Make'/>
                </div>
                <div>
                    <label htmlFor="model">Vehicle Model</label>
                    <Input {...register('model')} name="model" placeholder='Vyear'/>
                </div>
                <div>
                    <label htmlFor="year">Vehicle Year</label>
                    <Input {...register('year')} name="year" placeholder='Vehicle Year'/>
                </div>
                <div>
                    <label htmlFor="address">Vehicle Color</label>
                    <Input {...register('color')} name="color" placeholder='Vehicle Color'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}