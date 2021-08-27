class BaseRepository
{
    //TODO: constructor with model
    constructor(model)
    {
        this.model = model;
    }

    //get for id
    async get(id)
    {
        return await this.model.findById(id);
    }
    //get all
    async getAll()
    {
        return await this.model.find();
    }
    //create
    async create(entity)
    {
        return await this.model.create(entity);
    }
    //update
    async update(id, entity)   // {username:'sdfgsdfg'}
    {
        return await this.model.findByIdAndUpdate(id, entity, { new:true });
    }
    //delete
    async delete(id)
    {
        return await this.model.findByIdAndDelete(id);
    }

}

module.exports = BaseRepository;