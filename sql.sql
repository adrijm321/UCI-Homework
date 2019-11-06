create table departments (
	dept_no varchar primary key,
	dept_name varchar unique
);
drop table emp
create table employees(
	emp_no int not null primary key,
	birth_date date not null,
	first_name varchar not null,
	last_name varchar not null,
	gender varchar not null,
	hire_date date not null

);
select * from employees
select * from departments
create table dept_emp(
	emp_no int not null,
	dept_no varchar not null,
	from_date date not null,
	to_date date not null,
	foreign key (emp_no) references employees(emp_no), 
	foreign key (dept_no) references departments(dept_no),
	primary key(emp_no, dept_no)
);

create table dept_manager(
	dept_no varchar not null,
	emp_no int not null,
	from_date date not null,
	to_date date not null,
	foreign key (dept_no) references departments(dept_no),
	foreign key (emp_no) references employees(emp_no),
	primary key (dept_no, emp_no)
);

create table salaries(
	emp_no int not null,
	salary int not null,
	from_date date not null,
	to_date date not null,
	foreign key(emp_no) references employees(emp_no),
	primary key(emp_no, from_date)
	
);

create table titles(
	emp_no int not null,
	title varchar not null,
	from_date date not null,
	to_date date not null,
	foreign key(emp_no) references employees(emp_no),
	primary key(emp_no, from_date)
);