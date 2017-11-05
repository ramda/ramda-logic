import smap from './smap';

export default function run(goal) {
  return goal(smap({}));
};

