/**
 * Created by Administrator on 2015/11/17.
 */
export function checkIsInArry(e, arry) {
    for (var i = 0; i < arry.length; i++) {
        if (arry[i] == e)
            return true;
    }
    return false;
}