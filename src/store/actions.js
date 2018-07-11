import * as types from './mutation-type'

export const increment=function({commit}){ 
	commit(types.INCREMENT)  //提交方法
}