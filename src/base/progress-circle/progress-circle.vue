<template>
    <div class="progress-circle">
        <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1">
            <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
            <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
                :stroke-dasharray="dashAaary"
                :stroke-dashoffset="dashOffset"
            ></circle>  
        </svg>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props:{
            radius:{
                type:Number,
                default:100
            },
            percent:{
                type:Number,
                default:0
            }
        },
        data(){
            return {
                dashAaary: Math.PI * 100
            }
        },
        computed:{
            dashOffset(){
                return (1 - this.percent) * this.dashAaary
            }
        }
    }
</script>

<style scoped lang="scss">
    .progress-circle {
        position: relative;
        circle {
            stroke-width: 8px;
            transform-origin: center;
            &.progress-background {
                transform: scale(.9);
                stroke: rgba(255,205,49,.5);
            }
            &.progress-bar {
                transform: scale(.9) rotate(-90deg);
                stroke: #ffcd32;
            }
        }
    }
</style>

