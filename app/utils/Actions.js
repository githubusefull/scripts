"use server";
import { Todo } from './models';
import { connectToDb } from './connect';

export const addTask = async (formData) => {
    const { name } = Object.fromEntries(formData);
    try {
        connectToDb();
        const newTask = new Todo({
            name,
        });
        await newTask.save();

    } catch (err) {
        console.log(err);
        throw new Error("Failed to create task!");
    }
};