import defaultProducts from "../src/models/defaultProducts";

describe("Stupid tests at the moment", ()=>{


    /*afterAll(async()=>{
        await userStore.deleteAll();
        return await productStore.deleteAll();
    });

    beforeAll(async()=>{
        await userStore.deleteAll();
        return await productStore.deleteAll();
    });
*/

    it("lists default products", async()=>{
        expect(defaultProducts.length).toEqual(3);
    });


});

