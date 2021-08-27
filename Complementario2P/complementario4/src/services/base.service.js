class BaseService
{
    constructor(repository)
    {
        this.repository = repository;
    }

    //TODO: mEtodos de CRUD
    //get
    async get(id){
        if (!id)
        {
            const error =  new Error();
            error.status = 400;
            error.message= "ID es necesario enviarlo";
            throw error;
        }
        const currentEntity =  await this.repository.get(id);
        if (!currentEntity)
        {
            const error  =  new Error();
            error.status = 404;
            error.message = " Entidad no fue encontrada";
            throw error;
        }
        return currentEntity;
    }
    //getAll
    async getAll()
    {
        return await this.repository.getAll();
    }
    //create
    async create(entity)
    {
        return await this.repository.create(entity);
    }
    //update
    async update(id, entity)
    {
        if (!id)
        {
            const error = new Error();
            error.status=400;
            error.message="ID debe ser enviado de forma obligatoria";
            throw error;
        }
        return await this.repository.update(id, entity);
    }

    //delete
    async delete(id)
    {
        if (!id)
        {
            const error = new Error();
            error.status=400;
            error.message="ID es obligatorio";
            throw error;
        }
        return this.repository.delete(id);
    }


}

module.exports = BaseService;