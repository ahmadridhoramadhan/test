import { Canister, update, text, Void, query, nat32 } from 'azle'
import { todo } from 'node:test';

let toDoes = ['']

export default Canister({
    addToDo: update([text], Void, (newToDo: string) => {
        if (newToDo == '') {
            return
        }
        toDoes.push(newToDo)
    }),

    getToDo: query([], text, () => {
        let toDo = "\n \t To Do List \n"
        let index = 0
        toDoes.map((value) => {
            if (value != '') {
                index++
                toDo += index + "." + value + '\n'
            }
        })

        return toDo
    }),

    deleteToDo: update([nat32], Void, (index) => {
        index++
        toDoes.splice(index, 1)
    }),

    updateToDo: update([nat32, text], Void, (index, newToDo) => {
        toDoes[index] = newToDo
    }),

    addToDoAfter: update([nat32, text], Void, (index, newToDo) => {
        index++
        toDoes.splice(index, 0, newToDo)
    }),

    checkToDo: update([nat32], Void, (index) => {
        // Tandai tugas sebagai selesai
        toDoes[index] = toDoes[index] + ' (Done)'


    }),

    uncheckToDo: update([nat32], Void, (index) => {
        const text = toDoes[index]
        const kataLama = " (Done)"
        const kataBaru = ""
        toDoes.splice(index, 1, text.replace(kataLama, kataBaru))

    }),

    deleteAllToDo: update([], Void, () => {
        toDoes = ['']
    })
});

