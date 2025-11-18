function createTodo(title){
    return {
        id:Date.now().toString(),
        title:title,
        completed:false
    };
}
export {createTodo};