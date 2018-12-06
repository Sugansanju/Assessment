<template>
<b-container class="button-panel">
    <b-row>
        <b-col v-show="activeSection==button.id" style="padding:0 0 0 0;" cols="3" v-for="(button,index) in buttons" v-bind:key="index" @click="$emit('clicked',index)">
            <span class="not_visited"       v-if="!button.visited && !button.answered && !button.bookmarked">{{button.index}}</span>
            <span class="not_answered"      v-if="button.visited && !button.answered && !button.bookmarked">{{button.index}}</span>
            <span class="answered"          v-if="button.visited && button.answered && !button.bookmarked">{{button.index}}</span>
            <span class="review"            v-if="button.visited && !button.answered && button.bookmarked">{{button.index}}</span>
            <span class="review_answered"   v-if="button.visited && button.answered && button.bookmarked">{{button.index}}</span>
        </b-col>
    </b-row>
</b-container>
</template>
<script>
export default {
    name: 'AnswerButtonPanel',
    props: ['buttons', 'activeSection'],
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>
<style scoped>
.button-panel span {
    background: url('/static/images/questions-sprite.png') no-repeat;
    color: #fff;
    cursor: pointer;
    float: left;
    line-height: 42px;
    margin-bottom: 10px;
    text-align: center;
    width: 50px;
}
.button-panel span.not_visited {
    background-position: -157px -4px;
    color: #474747;
    height: 43px;
    line-height: 43px;
}
.button-panel span.not_answered{
    background-position: -57px -6px;
    width: 49px;
    height: 43px;
}
.button-panel span.review{
    background-position: -108px -1px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 3px;
}
.button-panel span.review_answered{
    background-position: -203px -49px;
    height: 53px;
    line-height: 50px;
    margin-bottom: 0;
    width: 53px;
}
.button-panel span.answered{
    background-position: -4px -5px;
}
</style>

