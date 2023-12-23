import { Canister, update, text, Void, query, nat32 } from 'azle';

let toDos: string[] = [];

export default Canister({
    addToDo: update([text], Void, (newToDo: string) => {
        if (newToDo.trim() !== '') {
            toDos.push(newToDo.trim());
        }
    }),

    getToDo: query([], text, () => {
        let toDo = '\n \t To Do List \n';
        toDos.forEach((value, index) => {
            toDo += `${index + 1}. ${value}\n`;
        });
        return toDo;
    }),

    deleteToDo: update([nat32], Void, (index) => {
        if (index >= 0 && index < toDos.length) {
            toDos.splice(index, 1);
        }
    }),

    updateToDo: update([nat32, text], Void, (index, newToDo) => {
        if (index >= 0 && index < toDos.length) {
            toDos[index] = newToDo.trim();
        }
    }),

    addToDoAfter: update([nat32, text], Void, (index, newToDo) => {
        if (index >= 0 && index < toDos.length) {
            index++;
            toDos.splice(index, 0, newToDo.trim());
        }
    }),

    checkToDo: update([nat32], Void, (index) => {
        if (index >= 0 && index < toDos.length) {
            // Mark task as done
            toDos[index] += ' (Done)';
        }
    }),

    uncheckToDo: update([nat32], Void, (index) => {
        if (index >= 0 && index < toDos.length) {
            const text = toDos[index];
            const oldKeyword = ' (Done)';
            const newKeyword = '';
            toDos.splice(index, 1, text.replace(oldKeyword, newKeyword));
        }
    }),

    deleteAllToDo: update([], Void, () => {
        toDos = [];
    }),
});
