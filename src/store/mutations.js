import * as types from "./mutation-type" 

const mutations={  //方法
	[types.INCREMENT](state){
		state.count=state.count+1  //设置新state
	}
}

export default mutations